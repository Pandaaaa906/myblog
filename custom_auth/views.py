from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import redirect

# Create your views here.
from rest_framework import serializers, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class SimpleUserSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    @staticmethod
    def get_username(obj):
        return obj.get_full_name() or obj.userprofile.gh_name

    class Meta:
        model = User
        fields = [
            'id',
            'username',
        ]


class Auth(viewsets.ViewSet):

    @action(detail=False)
    def is_logged_in(self, request):
        user = None
        if request.user.is_authenticated:
            user = request.user
        serializer = SimpleUserSerializer(user, many=False)
        return Response(serializer.data)

    @action(detail=False, methods=['POST'])
    def login(self, request):
        data = request.data
        email = data['email']
        password = data['password']
        print(email, password)
        user = authenticate(username=email, password=password)
        if user is None:
            return redirect(f"/login?err_msg={'Invalid Password or Email'}")
        if user.is_active:
            login(request, user)
        return redirect(self.kwargs.get("next", "/"))

    @action(detail=False, methods=['POST', 'GET'])
    def logout(self, request):
        if request.user.is_authenticated:
            logout(request)
        return redirect(self.kwargs.get("next", "/"))
