from annoying.fields import AutoOneToOneField
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.db import models

from utils.models import BaseModel


class UserProfile(BaseModel):
    user = AutoOneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    gh_name = models.TextField(null=True, default=None, blank=True)
    access_token = models.TextField(null=True, default=None, blank=True)
    github_id = models.IntegerField(null=True, default=None, blank=True, unique=True)
    bio = models.TextField(null=True, default=None, blank=True)
    avatar_url = models.URLField(null=True, default=None, blank=True)
    html_url = models.URLField(null=True, default=None, blank=True)
    location = models.TextField(null=True, default=None, blank=True)
