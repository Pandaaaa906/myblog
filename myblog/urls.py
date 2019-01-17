"""myblog URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
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
from django.urls import path

from article.views import ArticleView, TagListView
from github_oauth.views import GithubOauth
from main.views import Index, Login, Logout, About

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', Index.as_view()),
    path('article/<int:_id>', ArticleView.as_view()),
    path('tag/<int:_id>', TagListView.as_view()),
    path('about/', About.as_view(), name="about"),
    path('login/', Login.as_view(), name="login"),
    path('logout/', Logout.as_view(), name="logout"),
    path('github_oauth/', GithubOauth.as_view(), name="github_oauth"),
]

handler404 = 'main.views.page_not_found_handler'
handler500 = 'main.views.page_server_error_handler'

