from contextvars import Token
import sqlite3
import json
import logging
from django.http import HttpResponse
from .models import Register
from rest_framework import viewsets
from .serializer import RegisterSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .models import Event
from django.http import JsonResponse 

# Vista para manejar solicitudes GET, POST, PUT, DELETE relacionadas con el registro de usuarios
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

            # Generar token de actualización
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

            # Si se cambió la contraseña, se vuelve a generar el token y se encripta la nueva contraseña
            if 'psw' in request.data:
                instance.set_password(request.data['psw'])
                instance.save()

                refresh = RefreshToken.for_user(instance)
                token = str(refresh.access_token)

                return Response({'token': token, "user": serializer.data}, status=status.HTTP_200_OK)

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# Otra vista de ejemplo
def saludo(request):
    return HttpResponse("Hola mundo")

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

    # Genera tokens JWT
    refresh = RefreshToken.for_user(register)
    token = str(refresh.access_token)

    serializer = RegisterSerializer(instance=register)
    return Response({"token": token, "user": serializer.data}, status=status.HTTP_200_OK)

@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        register = Register.objects.get(email=serializer.data['email'])
        register.set_password(serializer.data['psw'])
        register.save()
        # Generar token de actualización
        refresh = RefreshToken.for_user(register)
        token = str(refresh.access_token)
        return Response({'token': token, "user": serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def index(request):  
    all_events = Event.objects.all()
    context = {
        "events":all_events,
    }
    return render(request,'index.html',context)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    try:
        register_instance = Register.objects.get(email=request.user.email)
    except Register.DoesNotExist:
        return Response({"message": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = RegisterSerializer(instance=register_instance)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_events(request):
    try:
        register_instance = Register.objects.get(email=request.user.email)
    except Register.DoesNotExist:
        return Response({"message": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        try:
            # Obtener todos los eventos asociados al usuario autenticado
            user_events = Event.objects.filter(owner=register_instance)

            # Crear una lista de diccionarios con los detalles de cada evento
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

            # Devolver la lista de eventos como una respuesta JSON
            return JsonResponse(event_list, safe=False)
        except Exception as e:
            # Imprimir la excepción en la consola del servidor Django
            print(e)
            # Devolver una respuesta JSON indicando que ocurrió un error interno del servidor
            return JsonResponse({"success": False, "message": "Internal Server Error"}, status=500)
    else:
        return JsonResponse({"success": False, "message": "Only GET requests are allowed"}, status=405)

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_event(request):
    try:
        # Obtener los datos del cuerpo de la solicitud
        data = json.loads(request.body)
        start = data.get("start", None)
        end = data.get("end", None)
        title = data.get("title", None)

        # Verificar si todos los campos requeridos están presentes
        if start is not None and end is not None and title is not None:
            # Obtener el usuario autenticado
            owner = Register.objects.get(email=request.user.email)

            # Crear el evento asociado al usuario autenticado
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
        data = json.loads(request.body)
        
        # Buscar el evento que pertenece al usuario autenticado
        event = Event.objects.get(id=event_id, owner__email=request.user.email)

        # Actualizar todos los campos del evento
        event.name = data.get('title', event.name)
        event.start = data.get('start', event.start)
        event.end = data.get('end', event.end)

        # Guardar los cambios
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
        # Eliminar el evento
        event.delete()
        return Response({"success": True}, status=status.HTTP_200_OK)
    except Event.DoesNotExist:
        return Response({"success": False, "message": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)