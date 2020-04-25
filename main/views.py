import logging

from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ValidationError
from django.http import HttpResponseBadRequest
from django.shortcuts import render, redirect

# Create your views here.
from django.views import View

from article.models import Article, Tag
from main.forms import LoginForm
from main.models import ConstantDict


class Index(View):
    def get(self, request, *args, **kwargs):
        articles = Article.objects.filter().order_by('-created_at')[:5]
        tags = Tag.objects.filter().order_by('-created_at')[:10]
        return render(request, "index.html", {"articles": articles, "tags": tags})


class About(View):
    def get(self, request):
        item = ConstantDict.objects.filter(key="about").first()
        about = getattr(item, 'value')
        return render(request, "about.html", {"about": about})


class Login(View):
    formclass = LoginForm

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect(self.kwargs.get("next", "/"))
        form = self.formclass()
        return render(request, "login.html", {"form": form})

    def post(self, request, *args, **kwargs):
        form = self.formclass(request.POST)
        if not form.is_valid():
            return redirect(f"/login?err_msg={'Invalid Form'}")
        email = form.cleaned_data['email']
        password = form.cleaned_data['password']
        user = authenticate(username=email, password=password)
        if user is None:
            return redirect(f"/login?err_msg={'Invalid Password or Email'}")
        if user.is_active:
            login(request, user)
        return redirect(self.kwargs.get("next", "/"))


class Logout(View):
    def get(self, request):
        if request.user.is_authenticated:
            logout(request)
        return redirect(self.kwargs.get("next", "/"))


def page_not_found_handler(request, *args, **kwargs):
    print(args, kwargs)
    response = render(request, '404.html')
    response.status_code = 404
    return response


def page_server_error_handler(request, *args, **kwargs):
    print(args, kwargs)
    response = render(request, '500.html')
    response.status_code = 500
    return response
