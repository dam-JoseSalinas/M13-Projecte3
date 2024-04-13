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
