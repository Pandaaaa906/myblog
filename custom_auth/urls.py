from django.conf.urls import url
from django.urls import include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'', views.Auth, basename="auth")

urlpatterns = [
    url(r'^', include(router.urls)),
]
