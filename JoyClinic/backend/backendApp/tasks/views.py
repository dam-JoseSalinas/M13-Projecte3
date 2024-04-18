from django.shortcuts import render
from django.http import HttpResponse
from .models import Register
from rest_framework import viewsets
from .serializer import RegisterSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.contrib.auth.forms import UserCreationForm

# Vista para manejar solicitudes GET, POST, PUT, DELETE relacionadas con el registro de usuarios
class RegisterAPIsREST(viewsets.ModelViewSet):
    serializer_class = RegisterSerializer
    queryset = Register.objects.all()



# Otra vista de ejemplo
def saludo(request):
    return HttpResponse("Hola mundo")

def loginApiView(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        psw = request.POST.get('psw')

        try:
            user = Register.objects.get(email=email)
        except Register.DoesNotExist:
            return JsonResponse({'error': 'Correro electrónico no registrado'}, status=400)
        
        if user.check_password(psw):
            login(request, user)
            return JsonResponse({'message': 'Incio de sesión'})
        else:
            return JsonResponse({'error': 'Credenciales incorrectos'}, status=400)
    else:
        return JsonResponse({'error': 'Metodo no permitido'}, status=400)
'''
def authView(request): 
    if request.method == "POST":
        form = UserCreationForm(request.POST or None)
        if form.is_valid():
            form.save()

        form = UserCreationForm()
        return render
'''

