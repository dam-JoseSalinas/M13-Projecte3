from contextvars import Token
import sqlite3
import json
import logging
from django.http import HttpResponse
from .models import Register, Message
from rest_framework import viewsets
from .serializer import RegisterSerializer, MessageSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from .models import Event
from django.http import JsonResponse 
from .pusher import pusher, pusher_client
from django.core.exceptions import ObjectDoesNotExist

class RegisterAPIsREST(viewsets.ModelViewSet):
    serializer_class = RegisterSerializer
    queryset = Register.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            register = Register.objects.get(email=serializer.data['email'])
            register.set_password(serializer.data['psw'])
            register.save()

            refresh = RefreshToken.for_user(register)
            token = str(refresh.access_token)

            return Response({'token': token, "user": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)

        if serializer.is_valid():
            serializer.save()

            if 'psw' in request.data:
                instance.set_password(request.data['psw'])
                instance.save()

                refresh = RefreshToken.for_user(instance)
                token = str(refresh.access_token)

                return Response({'token': token, "user": serializer.data}, status=status.HTTP_200_OK)

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
def profileDefault(request):
    default_photo_url = 'http://127.0.0.1:8000/frontEndApp/asset/images/foto_perfil/perfil.jpg'
    return HttpResponse(default_photo_url)

@api_view(['POST'])
def login(request):
    try:
        register = Register.objects.get(email=request.data['email'])
    except Register.DoesNotExist:
        raise AuthenticationFailed("Invalid email or password")

    if not register.check_password(request.data['psw']):
        raise AuthenticationFailed("Invalid email or password")

    refresh = RefreshToken.for_user(register)
    token = str(refresh.access_token)

    serializer = RegisterSerializer(instance=register)
    return Response({"token": token, "id": serializer.data["id"]}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    try:
        # Obtener el usuario autenticado desde el objeto de solicitud
        user = request.user
        # Buscar el registro asociado al usuario autenticado
        register = Register.objects.get(email=user.email)
        serializer = RegisterSerializer(instance=register)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Register.DoesNotExist:
        return Response({"message": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_profile_with_token(request):
    try:
        user = request.user
        
        register = Register.objects.get(email=user.email)
        
        register.name = request.data.get('name', register.name)
        register.surname = request.data.get('surname', register.surname)
        register.number = request.data.get('number', register.number)
        register.email = request.data.get('email', register.email)
        register.psw = request.data.get('psw', register.psw)
        register.bio = request.data.get('bio', register.bio)
        register.birth_date = request.data.get('birth_date', register.birth_date)
        register.address = request.data.get('address', register.address)
        register.city = request.data.get('city', register.city)
        register.country = request.data.get('country', register.country)
        register.postal_code = request.data.get('postal_code', register.postal_code)
        
        register.save()
        
        if 'psw' in request.data:
            register.set_password(request.data['psw'])
            register.save()
            refresh = RefreshToken.for_user(register)
            token = str(refresh.access_token)
            return Response({'token': token, "user": RegisterSerializer(instance=register).data}, status=status.HTTP_200_OK)
        
        serializer = RegisterSerializer(instance=register)
        return JsonResponse(serializer.data, status=200)
    
    except Register.DoesNotExist:
        return JsonResponse({"error": "Profile not found."}, status=404)
    
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        register = Register.objects.get(email=serializer.data['email'])
        register.set_password(serializer.data['psw'])
        register.save()
        refresh = RefreshToken.for_user(register)
        token = str(refresh.access_token)
        return Response({'token': token, "user": serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def index(request):
    all_events = Event.objects.all()
    context = {
        "events": all_events,
    }
    return render(request, 'index.html', context)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_events(request):
    try:
        register_instance = Register.objects.get(email=request.user.email)
    except Register.DoesNotExist:
        return Response({"message": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        try:
            user_events = Event.objects.filter(owner=register_instance)
            event_list = []
            for event in user_events:
                event_dict = {
                    'id': event.id,
                    'title': event.name,
                    'start': event.start.strftime("%m/%d/%Y, %H:%M:%S"),
                    'end': event.end.strftime("%m/%d/%Y, %H:%M:%S"),
                    'owner': event.owner.name if event.owner else None
                }
                event_list.append(event_dict)
            return JsonResponse(event_list, safe=False)
        except Exception as e:
            print(e)
            return JsonResponse({"success": False, "message": "Internal Server Error"}, status=500)
    else:
        return JsonResponse({"success": False, "message": "Only GET requests are allowed"}, status=405)


@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_event(request):
    try:
        data = request.data
        start = data.get("start", None)
        end = data.get("end", None)
        title = data.get("title", None)

        if start is not None and end is not None and title is not None:
            owner = Register.objects.get(email=request.user.email)
            event = Event.objects.create(name=title, start=start, end=end, owner=owner)
            return Response({"success": True, "event_id": event.id}, status=status.HTTP_201_CREATED)
        else:
            return Response({"success": False, "message": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update(request, event_id):
    try:
        data = request.data
        event = Event.objects.get(id=event_id, owner__email=request.user.email)
        event.name = data.get('title', event.name)
        event.start = data.get('start', event.start)
        event.end = data.get('end', event.end)
        event.save()
        return Response({"success": True}, status=status.HTTP_200_OK)
    except Event.DoesNotExist:
        return Response({"success": False, "message": "Event not found or you do not have permission to edit it"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove(request, event_id):
    try:
        event = Event.objects.get(id=event_id)
        event.delete()
        return Response({"success": True}, status=status.HTTP_200_OK)
    except Event.DoesNotExist:
        return Response({"success": False, "message": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class MessageAPIView(APIView):

    def post(self, request):
        pusher_client.trigger('chat', 'message', {
            'username': request.data['username'],
            'message': request.data['message'],
        })

        return Response([])
    
class MessageCreateView(generics.CreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

@api_view(['GET'])
def contar_pacientes(request):
    num_pacientes = Register.objects.count()
    return Response({num_pacientes})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def contar_eventos(request):
    try:
        register_instance = Register.objects.get(email=request.user.email)
    except Register.DoesNotExist:
        return Response({"message": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

    try:
        user_events_count = Event.objects.filter(owner=register_instance).count()
        return Response({user_events_count})
    except Exception as e:
        print(e)
        return Response({"success": False, "message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
