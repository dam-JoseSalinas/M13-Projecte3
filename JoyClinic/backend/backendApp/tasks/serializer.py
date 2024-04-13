from rest_framework import serializers
from .models import Register


class RegisterSerializer(serializers.ModelSerializer):
    email2 = serializers.EmailField(write_only=True)
    pwd2 = serializers.CharField(max_length=200, write_only=True)

    class Meta:
        model = Register
        fields = ['id','name', 'surname', 'number', 'email', 'email2', 'psw', 'pwd2']
    
    def validate(self, data):
        email = data.get('email')
        email2 = data.get('email2')
        psw = data.get('psw')
        pwd2 = data.get('pwd2')

        # Validación de correos electrónicos
        if email != email2:
            raise serializers.ValidationError({'email': 'Los correos electrónicos no coinciden'})

        # Validación de contraseñas
        if psw != pwd2:
            raise serializers.ValidationError({'psw': 'Las contraseñas no coinciden'})

        # Verificación de correo electrónico único
        if email and Register.objects.filter(email=email).exists():
            raise serializers.ValidationError({'email': 'Este correo electrónico ya está en uso'})

        return data

    def validate_number(self, value):
        try:
            int(value)
        except ValueError:
            raise serializers.ValidationError('El número debe contener solo dígitos.')

        return value

    def create(self, validated_data):
        # Realiza cualquier acción de creación necesaria
        return Register.objects.create(**validated_data)


