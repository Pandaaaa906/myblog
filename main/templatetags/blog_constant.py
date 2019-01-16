from django import template

from article.models import Tag
from main.models import NavBarItem, ConstantDict

register = template.Library()


@register.inclusion_tag("navbar.html")
def get_nav_bar_items():
    items = NavBarItem.objects.all()
    return {"items": items}


@register.inclusion_tag("tags.html")
def show_tags():
    tags = Tag.objects.all()
    return {"tags": tags}


@register.simple_tag
def get_constant(key):
    try:
        item = ConstantDict.objects.get(key=key)
    except ConstantDict.DoesNotExist:
        return None
    return item.value
