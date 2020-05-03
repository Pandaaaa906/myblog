from django.http import HttpResponseForbidden
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from article.models import Article, Tag, Comment
from article.serializers import ArticleSerializer, TagSerializer, CommentSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.filter().order_by('-created_at')
    serializer_class = ArticleSerializer
    # authentication_classes = (BasicAuthentication, )

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

    @action(detail=True, methods=['post', 'get'])
    def add_comment(self, request, pk=None, *args, **kwargs):
        if not request.user.is_authenticated:
            raise HttpResponseForbidden
        user = request.user
        parent_id = request.data.get('parent_id', None)
        content = request.data.get('content', None)
        article = self.get_object()
        parent = None
        if parent_id is not None:
            parent = get_object_or_404(Comment, pk=parent_id)
        Comment.objects.create(
            article=article,
            parent=parent,
            content=content,
            created_by=user,
            modified_by=user
        )
        return Response({
            'details': 'Success'
        })


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.filter().order_by('-modified_at')
    serializer_class = TagSerializer

