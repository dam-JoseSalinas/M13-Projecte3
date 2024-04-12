from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

# Create your models here.
def validate_number(value):
    try:
        int(value)
    except ValueError:
        raise ValidationError('El número debe contener solo dígitos.')
    
class Register(models.Model):
    name = models.CharField(max_length=200)
    surname = models.CharField(max_length=200)
    number = models.CharField(max_length=200, validators=[validate_number]) 
    email = models.EmailField(max_length=200)
    email2 = models.EmailField(max_length=200)
    psw = models.CharField(max_length=200)
    pwd2 = models.CharField(max_length=200)

    def __str__(self) -> str:
        return self.name
    
    def clean(self):
        if self.email != self.email2:
            raise ValidationError({'email': 'Los correos electrónicos no coinciden'})
        if self.psw != self.pwd2:
            raise ValidationError({'psw': 'Las contraseñas no coinciden'})

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