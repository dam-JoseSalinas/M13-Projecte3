import sqlite3
from django.shortcuts import render
from django.http import HttpResponse
from .models import Register
from rest_framework import viewsets
from .serializer import RegisterSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

# Vista para manejar solicitudes GET, POST, PUT, DELETE relacionadas con el registro de usuarios
class RegisterAPIsREST(viewsets.ModelViewSet):
    serializer_class = RegisterSerializer
    queryset = Register.objects.all()

# Otra vista de ejemplo
def saludo(request):
    return HttpResponse("Hola mundo")

class LoginApiView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        psw = request.data.get('psw')

        try:
            with sqlite3.connect(".\\db.sqlite3") as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT email, psw FROM tasks_register WHERE email = ? AND psw = ?", (email, psw))
                resultado = cursor.fetchone()

                if resultado:
                    return Response({"message": "¡Inicio de sesión exitoso!"}, status=status.HTTP_200_OK)
                else:
                    return Response({"message": "Credenciales incorrectas"}, status=status.HTTP_401_UNAUTHORIZED)

        except Exception as ex:
            return Response({"message": "Error interno del servidor"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request, *args, **kwargs):
        return Response({"message": "Método no permitido"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
def profileDefault(request):
    default_photo_url = 'http://127.0.0.1:8000/frontEndApp/asset/images/foto_perfil/perfil.jpg'
    return HttpResponse(default_photo_url)



