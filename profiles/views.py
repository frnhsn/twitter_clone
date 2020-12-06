from django.shortcuts import render, redirect
from django.http import Http404

from .forms import ProfileForm
from .models import Profile

# Create your views here.
def profile_detail_view(request, *args, **kwargs):

    qs = Profile.objects.filter(user__username=kwargs['username'])

    if not qs.exists():
        raise Http404

    profile_obj = qs.first()
    context = {
        "username": kwargs['username'],
        "profile": profile_obj
    }

    return render(request, 'profiles/detail.html', context)

def profile_update_view(request, *args, **kwargs):
    if request.user.is_authenticated:
        return redirect("/login?next=/profiles/update")

    user = request.user
    my_profile = request.user.profile
    form = ProfileForm(request.POST or None, instance=my_profile)

    if form.is_valid():
        profile_obj = form.save(commit=False)
        user.first_name = form.cleaned_data.get('first_name')
        user.last_name = form.cleaned_data.get('last_name')
        user.email_address = form.cleaned_data.get('email_address')

        user.save()
        profile_obj.save()


