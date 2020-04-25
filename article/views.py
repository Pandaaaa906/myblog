from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from article.models import Article, Tag, Comment
from article.serializers import ArticleSerializer, TagSerializer, CommentSerializer


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

