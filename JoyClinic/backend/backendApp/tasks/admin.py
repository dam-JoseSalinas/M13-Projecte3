from django.contrib import admin
from .models import Register
from  .models import Event
from  .models import Message
# Register your models here.

admin.site.register(Register)
admin.site.register(Event)
admin.site.register(Message)