from django.contrib.auth import get_user_model
# from django.contrib.auth.backends import ModelBackend


class EmailBackend:
    def authenticate(self, request, username=None, password=None, **kwargs):
        user_model = get_user_model()
        try:
            user = user_model.objects.get(email=username)
        except user_model.DoesNotExist:
            return None
        if not user.check_password(password):
            return None
        return user

    def get_user(self, user_id):
        print(user_id)
        user_model = get_user_model()
        try:
            return user_model.objects.get(pk=user_id)
        except user_model.DoesNotExist:
            return None