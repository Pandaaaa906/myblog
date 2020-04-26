from functools import wraps

from django.core.cache import cache
from django_redis import get_redis_connection
from ipware import get_client_ip
from rest_framework.exceptions import PermissionDenied, Throttled

redis_conn = get_redis_connection("default")


def visit_threshold(secs: int = 1, n_per_secs: int = 5):
    def outer(view_func):
        @wraps(view_func)
        def wrapped_view(request, *args, **kwargs):
            ip = get_client_ip(request)
            cache.incr(ip, ignore_key_check=True)
            cache.expire(ip, secs)
            if cache.get(ip) > n_per_secs:
                return Throttled()
            return view_func(request, *args, **kwargs)
        return wrapped_view
    return outer
