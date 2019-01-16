from django import forms
from django.contrib import admin

# Register your models here.
from django.db import models

from article.models import Article, Tag

from django import forms
from codemirror2.widgets import CodeMirrorEditor


class ArticleForm(forms.ModelForm):
    title = forms.CharField(widget=forms.TextInput())
    content = forms.CharField(widget=CodeMirrorEditor(options={'mode': 'markdown'}))
    tags = forms.ModelMultipleChoiceField(Tag.objects, widget=forms.CheckboxSelectMultiple(), required=False)


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['id', 'title',
                    'created_at', 'created_by',
                    'modified_at', 'modified_by']
    exclude = ['created_at', 'created_by',
               'modified_at', 'modified_by']
    form = ArticleForm


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['id', 'name',
                    'created_at', 'created_by',
                    'modified_at', 'modified_by']
    exclude = ['created_at', 'created_by',
               'modified_at', 'modified_by']
    formfield_overrides = {
        models.TextField: {'widget': forms.TextInput}
    }
