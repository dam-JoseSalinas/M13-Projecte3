import sqlite3
import json
from django.http import HttpResponse
from .models import Register
from rest_framework import viewsets
from .serializer import RegisterSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.http import require_http_methods
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
'''
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
'''

'''
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def profile(request):

    serializer = RegisterSerializer(instance=request.register)

    return Response(serializer.data, status=status.HTTP_200_OK)
'''

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    try:
        register_instance = Register.objects.get(email=request.user.email)
    except Register.DoesNotExist:
        return Response({"message": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = RegisterSerializer(instance=register_instance)
    return Response(serializer.data, status=status.HTTP_200_OK)

def index(request):  
    all_events = Event.objects.all()
    context = {
        "events":all_events,
    }
    return render(request,'index.html',context)
 
def all_events(request):
    try:
        if request.method == 'GET':
            all_events = Event.objects.all()

            # Crear una lista de diccionarios con los detalles de cada evento
            event_list = []
            for event in all_events:
                event_dict = {
                    'id': event.id,
                    'title': event.name,
                    'start': event.start.strftime("%m/%d/%Y, %H:%M:%S"),
                    'end': event.end.strftime("%m/%d/%Y, %H:%M:%S"),
                }
                event_list.append(event_dict)

            # Devolver la lista de eventos como una respuesta JSON
            return JsonResponse(event_list, safe=False)
        else:
            return JsonResponse({"success": False, "message": "Only GET requests are allowed"}, status=405)
    except Exception as e:
        # Imprimir la excepción en la consola del servidor Django
        print(e)
        # Devolver una respuesta JSON indicando que ocurrió un error interno del servidor
        return JsonResponse({"success": False, "message": "Internal Server Error"}, status=500)

@csrf_exempt
def add_event(request):
    if request.method == "POST": 
        try:
            # Obtener los datos del cuerpo de la solicitud
            data = json.loads(request.body)
            start = data.get("start", None)
            end = data.get("end", None)
            title = data.get("title", None)
            
            # Verificar si todos los campos requeridos están presentes
            if start is not None and end is not None and title is not None:
                # Crear el evento
                event = Event(name=str(title), start=start, end=end)
                event.save()
                return JsonResponse({"success": True})
            else:
                return JsonResponse({"success": False, "message": "Missing required fields"}, status=400)
        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=400)
    else:
        return JsonResponse({"success": False, "message": "Only POST requests are allowed"}, status=405)
 
@csrf_exempt
def update(request, event_id):
    if request.method == "PUT":
        try:
            data = json.loads(request.body)
            start = data.get("start", None)
            end = data.get("end", None)
            title = data.get("title", None)
            
            if start is not None and end is not None and title is not None:
                event = Event.objects.get(id=event_id)
                event.start = start
                event.end = end
                event.name = title
                event.save()
                return JsonResponse({"success": True})
            else:
                return JsonResponse({"success": False, "message": "Missing required fields"}, status=400)
        except Event.DoesNotExist:
            return JsonResponse({"success": False, "message": "Event not found"}, status=404)
        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=400)
    else:
        return JsonResponse({"success": False, "message": "Only PUT requests are allowed"}, status=405)

@csrf_exempt
def remove(request, event_id):
    if request.method == "DELETE":
        try:
            event = Event.objects.get(id=event_id)
            # Eliminar el evento
            event.delete()
            return JsonResponse({"success": True})
        except Event.DoesNotExist:
            return JsonResponse({"success": False, "message": "Event not found"}, status=404)
        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=400)
    else:
        return JsonResponse({"success": False, "message": "Only DELETE requests are allowed"}, status=405)
    