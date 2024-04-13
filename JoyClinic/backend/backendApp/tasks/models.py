from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator

# Create your models here.
from django.core.exceptions import ValidationError

def validate_number(value):
    try:
        number = int(value)
    except ValueError:
        raise ValidationError('El número debe contener solo dígitos.')

    if len(str(number)) != 9:
        raise ValidationError('El número debe tener exactamente 9 dígitos.')


class Register(models.Model):
    name = models.CharField(max_length=200)
    surname = models.CharField(max_length=200)
    number = models.CharField(max_length=200, unique=True, validators=[validate_number]) 
    email = models.EmailField(max_length=200, unique=True, validators=[EmailValidator(message='Ingrese un correo válido.')])
    email2 = models.EmailField(max_length=200, unique=True, validators=[EmailValidator(message='Ingrese un correo válido.')])
    psw = models.CharField(max_length=200)
    pwd2 = models.CharField(max_length=200)

    def clean(self):
        if self.email != self.email2:
            raise ValidationError({'email': 'Los correos electrónicos no coinciden'})
        if self.psw != self.pwd2:
            raise ValidationError({'psw': 'Las contraseñas no coinciden'})

    def __str__(self) -> str:
        return self.name
    

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Campos adicionales del perfil
    bio = models.TextField(blank=True)
    birth_date = models.DateField(null=True, blank=True)
    address = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    # Otros campos que desees agregar

    def __str__(self):
        return self.user.username