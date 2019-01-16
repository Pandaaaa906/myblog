from django.db import models

# Create your models here.
from utils.models import BaseModel


class Tag(BaseModel):
    name = models.TextField(null=False, unique=True)

    def __str__(self):
        return self.name


class Article(BaseModel):
    title = models.TextField(null=False)
    content = models.TextField(null=True)
    tags = models.ManyToManyField(Tag, default=None, blank=True)

    class Meta:
        ordering = ['-created_at']


class Comment(BaseModel):
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    parent = models.ForeignKey("self", null=True, default=None, blank=True, on_delete=models.CASCADE)
    content = models.TextField(null=True)

    class Meta:
        ordering = ['-created_at']
