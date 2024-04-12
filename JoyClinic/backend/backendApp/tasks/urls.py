from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterViewSet.as_view({'post': 'create'}), name='register'),  # URL para el registro de usuarios
    # Otras URLs de la aplicación tasks
]
