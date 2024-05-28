"""
URL configuration for myproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from tasks.views import profileDefault, login, profile, index, all_events, add_event, update, register, remove, edit_profile_with_token, contar_pacientes, contar_eventos
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('index/', index, name='index'), 
    path('all_events/', all_events, name='all_events'), 
    path('add_event/', add_event, name='add_event'), 
    path('update/<int:event_id>/', update, name='update'),
    path('remove/<int:event_id>/', remove, name='remove'),
    #path('saludo/', saludo),
    path('image/', profileDefault),
    path('', include('tasks.urls')),
    re_path('login/', login),
    re_path('register', register),
    re_path('profile', profile),
    re_path('updateProfile', edit_profile_with_token),
    re_path('count', contar_pacientes),
    re_path('events', contar_eventos)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)




