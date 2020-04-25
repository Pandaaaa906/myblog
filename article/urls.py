from django.conf.urls import url
from django.urls import include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'articles', views.ArticleViewSet)
router.register(r'tags', views.TagViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
