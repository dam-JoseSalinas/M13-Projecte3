from django.urls import path, include
from rest_framework import routers
from tasks import views
from .views import MessageAPIView, MessageCreateView

router = routers.DefaultRouter()
router.register(r'registros', views.RegisterAPIsREST)

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path('messages/', MessageCreateView.as_view(), name='message-create'),
]