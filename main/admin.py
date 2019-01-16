from django import forms
from django.contrib import admin

# Register your models here.
from django.db import models

from main.models import ConstantDict, NavBarItem


@admin.register(ConstantDict)
class ConstantDictAdmin(admin.ModelAdmin):
    fields = ['app', 'key', '_type', 'value']
    list_display = ['id', 'app', 'key', '_type', 'value']

    formfield_overrides = {
        models.TextField: {'widget': forms.TextInput},
    }


@admin.register(NavBarItem)
class NavBarItemAdmin(admin.ModelAdmin):
    fields = ['caption', 'url', 'help_text', 'ordering']
    list_display = ['id', 'caption', 'url', 'help_text', 'ordering']

    formfield_overrides = {
        models.TextField: {'widget': forms.TextInput},
    }
