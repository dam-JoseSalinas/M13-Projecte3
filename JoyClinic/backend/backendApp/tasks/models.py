from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Task(models.Model):
    titile = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    done = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.titile

class Register(models.Model):
    register = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    surname = models.CharField(max_length=200)
    number = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    email2 = models.EmailField(max_length=200)
    psw = models.CharField(max_length=200)
    pwd2 = models.CharField(max_length=200)

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