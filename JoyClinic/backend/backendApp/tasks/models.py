from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator
from django.contrib.auth.hashers import make_password, check_password


def validate_password(value):
    if len(str(value)) < 8:
        raise ValidationError('La password debe tener mas de 8 caracteres')
    
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
    psw = models.CharField(max_length=200, validators=[validate_password])

    bio = models.TextField(blank=True)
    birth_date = models.DateField(null=True, blank=True, default=None)
    address = models.CharField(max_length=100, blank=True, default=None, null=True)
    city = models.CharField(max_length=100, blank=True, default=None, null=True)
    country = models.CharField(max_length=100, blank=True, default=None, null=True)
    postal_code = models.CharField(max_length=20, blank=True, default=None, null=True)
    photo = models.ImageField(blank=True, upload_to='', default='default.jpg')

    def set_password(self, raw_password):
        self.psw = make_password(raw_password)
    
    def check_password(self, raw_password):
        return check_password(raw_password, self.psw)
    
    def __str__(self) -> str:
        return self.name
    