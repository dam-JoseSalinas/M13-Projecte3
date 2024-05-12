import sqlite3
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def profile(request):
    # Accede al usuario autenticado a través del atributo `user` del request
    print(request.user.id)
    serializer = RegisterSerializer(instance=request.user)
    # Devuelve la información del perfil del usuario
    return Response(serializer.data, status=status.HTTP_200_OK)
