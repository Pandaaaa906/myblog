from annoying.fields import AutoOneToOneField
from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from utils.models import BaseModel


class ConstantDict(BaseModel):
    NUMBER = "NUMBER"
    TEXT = "TEXT"

    TYPES = (
        (NUMBER, "NUMBER"),
        (TEXT, "TEXT"),
    )
    app = models.TextField(null=True, blank=True)
    key = models.TextField()
    _type = models.TextField(choices=TYPES)
    value = models.TextField()


class NavBarItem(BaseModel):
    caption = models.TextField()
    url = models.TextField()
    help_text = models.TextField()
    ordering = models.IntegerField(default=0, blank=True)



