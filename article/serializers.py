from django.contrib.auth.models import User
from rest_framework import serializers

from article.models import Article, Tag, Comment


class ArticleSummarySerializer(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = [
            'id',
            'title',
            'content',
        ]


class TagSerializer(serializers.ModelSerializer):
    articles = ArticleSummarySerializer(many=True)

    def get_fields(self, *args, **kwargs):
        fields = super().get_fields(*args, **kwargs)
        request = self.context.get('request')
        if request is not None and not request.parser_context.get('kwargs'):
            fields.pop('articles', None)
        return fields

    class Meta:
        model = Tag
        fields = [
            'id',
            'name',
            'articles',
        ]


class ArticleSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = Article
        fields = [
            'id',
            'title',
            'content',
            'tags',
        ]


class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.ReadOnlyField(source='userprofile.avatar_url')
    username = serializers.SerializerMethodField()

    @staticmethod
    def get_username(obj):
        return obj.get_full_name() or obj.userprofile.gh_name

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'avatar',
        ]


class SourceCommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(source='created_by', many=False)

    class Meta:
        model = Comment
        fields = [
            'id',
            'content',
            'user'
        ]


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(source='created_by', many=False)
    parent = SourceCommentSerializer(many=False)

    class Meta:
        model = Comment
        fields = [
            'id',
            'parent',
            'content',
            'user',
        ]
