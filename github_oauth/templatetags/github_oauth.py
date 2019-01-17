from django import template
from django.conf import settings
from django.middleware import csrf

register = template.Library()


@register.simple_tag(takes_context=True)
def github_loin_url(context):
    request = context['request']
    client_id = settings.GITHUB_CLIENT_ID
    redirect_uri = settings.GITHUB_REDIRECT_URI
    state = csrf.get_token(request)
    return f"https://github.com/login/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&state={state}"
