from django.shortcuts import render, get_object_or_404, render_to_response

# Create your views here.
from django.views import View

from article.models import Article, Tag


class ArticleView(View):
    def get(self, request, _id, *args, **kwargs):
        article = get_object_or_404(Article, id=_id)
        return render(request, "article.html", {'article': article})


class TagListView(View):
    def get(self, request, _id):
        tag = get_object_or_404(Tag, id=_id)
        articles = tag.article_set.all()
        return render(request, "taglist.html", {"articles": articles, "tag": tag})
