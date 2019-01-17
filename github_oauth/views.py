import requests
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render
import urllib.parse as urlparse

# Create your views here.
from django.views import View


class GithubOauth(View):
    url_acess_token = "https://github.com/login/oauth/access_token"
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
        r = requests.post(self.url_acess_token, data=data, headers={"Accept": "application/json"})
        tmp_d = r.json()
        access_token = tmp_d.get("access_token")
        token_type = tmp_d.get("token_type")
        scope = tmp_d.get("scope")
        r = requests.get(self.url_user, params={"access_token": access_token})
        tmp_d = r.json()
        d = {}
        return JsonResponse(d)
