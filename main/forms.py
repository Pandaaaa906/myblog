from django import forms


class LoginForm(forms.Form):
    email = forms.EmailField(label="Email Address",
                             help_text="We'll never share your email with anyone else.",
                             widget=forms.EmailInput(attrs={'class': "form-control",
                                                            'placeholder': "Enter Email"}))
    password = forms.CharField(label="Password",
                               widget=forms.PasswordInput(attrs={'class': "form-control",
                                                                 'placeholder': "Enter Password"}))
