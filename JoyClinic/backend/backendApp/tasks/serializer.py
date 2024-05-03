from rest_framework import serializers
from .models import Register

class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Register
        fields = ['id','name', 'surname', 'number', 'email', 'psw', 'bio', 'birth_date', 'address', 'city', 'country', 'postal_code', 'photo']
    
    def create(self, validated_data):
        # Realiza cualquier acción de creación necesaria
        return Register.objects.create(**validated_data)




