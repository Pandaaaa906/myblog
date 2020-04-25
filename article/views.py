from django.http import HttpResponseForbidden, JsonResponse
from django.shortcuts import render, get_object_or_404, redirect

# Create your views here.
from django.views import View
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from article.models import Article, Tag, Comment
from article.serializers import ArticleSerializer, TagSerializer, CommentSerializer


class ArticleView(View):
    def get(self, request, _id, *args, **kwargs):
        article = get_object_or_404(Article, id=_id)
        comments = Comment.objects.filter(article=article)
        return render(request, "article.html",
                      {
                          'article': article,
                          'comments': comments,
                      })


class TagListView(View):
    def get(self, request, _id):
        tag = get_object_or_404(Tag, id=_id)
        articles = tag.article_set.all()
        return render(request, "taglist.html", {"articles": articles, "tag": tag})


def add_comment(request, _id, *args, **kwargs):
    if request.method == "GET":
        return HttpResponseForbidden()
    if not request.user.is_authenticated:
        return HttpResponseForbidden()
    user = request.user
    print(user)
    article = get_object_or_404(Article, id=_id)
    content = request.POST.get('content')
    if not content:
        return HttpResponseForbidden()
    comments = Comment.objects.create(article=article,
                                      created_by=user,
                                      content=content
                                      )
    return JsonResponse(({'status': 'success'}))


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.filter().order_by('-created_at')
    serializer_class = ArticleSerializer

    @action(detail=True, methods=['post', 'get'])
    def comments(self, requests, pk=None, *args, **kwargs):
        article = self.get_object()
        queryset = Comment.objects.filter(article=article).order_by('-created_at')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = CommentSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = CommentSerializer(queryset, many=True)
        return Response(serializer.data)


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.filter().order_by('-modified_at')
    serializer_class = TagSerializer

