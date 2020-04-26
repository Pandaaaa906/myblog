from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect

# Create your views here.
from django.views import View

from main.forms import LoginForm


class Login(View):
    form_class = LoginForm

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if not form.is_valid():
            return redirect(f"/login?err_msg={'Invalid Form'}")
        email = form.cleaned_data['email']
        password = form.cleaned_data['password']
        user = authenticate(username=email, password=password)
        if user is None:
            return redirect(f"/login?err_msg={'Invalid Password or Email'}")
        if user.is_active:
            login(request, user)
        return redirect(self.kwargs.get("next", "/"))


class Logout(View):
    def get(self, request):
        if request.user.is_authenticated:
            logout(request)
        return redirect(self.kwargs.get("next", "/"))
