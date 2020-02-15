import uuid

import requests
from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render, redirect
import urllib.parse as urlparse

# Create your views here.
from django.views import View


def get_or_register(github_user: dict, access_token: str):
    gh_name = github_user.get('name')
    email = github_user.get('email')
    github_id = github_user.get('id')
    try:
        user = User.objects.get(Q(userprofile__github_id=github_id) | Q(email=email))
    except User.DoesNotExist:
        random_password = uuid.uuid4().hex
        user = User.objects.create_user(gh_name, email, random_password)

    if user.userprofile.github_id is None:
        user.userprofile.github_id = github_id
        user.userprofile.gh_name = gh_name
        user.userprofile.access_token = access_token
        user.userprofile.bio = github_user.get('bio')
        user.userprofile.avatar_url = github_user.get('avatar_url')
        user.userprofile.html_url = github_user.get('html_url')
        user.userprofile.location = github_user.get('location')
        user.userprofile.save()

    return user


class GithubOauth(View):
    url_access_token = "https://github.com/login/oauth/access_token"
    url_user = "https://api.github.com/user"

    def get(self, request):
        code = request.GET.get("code")
        state = request.GET.get("state")
        data = {
            "client_id": settings.GITHUB_CLIENT_ID,
            "client_secret": settings.GITHUB_CLIENT_SECRET,
            "code": code,
            "state": state,
            "redirect_uri": "",
        }
        r = requests.post(self.url_access_token, data=data, headers={"Accept": "application/json"})
        tmp_d = r.json()
        access_token = tmp_d.get("access_token")
        r = requests.get(self.url_user, params={"access_token": access_token})
        tmp_d = r.json()
        user = get_or_register(tmp_d, access_token)

        login(request, user)
        return redirect('/')
