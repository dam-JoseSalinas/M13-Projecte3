from django.urls import path, include
from rest_framework import routers
from tasks import views
from .views import loginApiView

router = routers.DefaultRouter()
router.register(r'registros', views.RegisterAPIsREST)

urlpatterns = [
    path("api/v1/", include(router.urls)),
    #path("login/", loginApiView, name="login"),
]