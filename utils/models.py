from functools import wraps

from django.contrib.auth.models import User
from django.db import models


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    created_by = models.ForeignKey(User, null=True, default=None, blank=True,
                                   on_delete=models.CASCADE, related_name="%(app_label)s_%(class)s_created")
    modified_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    modified_by = models.ForeignKey(User, null=True, default=None, blank=True,
                                    on_delete=models.CASCADE, related_name="%(app_label)s_%(class)s_modified")

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        if not self.pk:
            self.created_by = user or self.created_by
        self.modified_by = user
        super().save(*args, **kwargs)
