from django import forms
from django.contrib.auth import get_user_model

from .models import Profile

User = get_user_model()

class ProfileForm(forms.Form):
    first_name = forms.CharField(required=False)
    last_name = forms.CharField(required=False)
    email_address = forms.CharField(required=False)

    class Meta:
        model = Profile
        fields = ['location', 'bio']
        