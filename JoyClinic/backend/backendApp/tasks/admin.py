from django.contrib import admin
from .models import Task
from .models import Profile
from .models import Register
# Register your models here.

admin.site.register(Task)
admin.site.register(Profile)
admin.site.register(Register)