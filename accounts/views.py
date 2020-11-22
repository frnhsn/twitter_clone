from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import login, logout

# Create your views here.
def login_view(request, *args, **kwargs):
    form = AuthenticationForm(request, data=request.POST or None)

    if form.is_valid():
        user_ = form.get_user()
        login(request, user_)
        return redirect("/")

    context = {
        "form": form,
        "btn_label": "Login",
        "title": "Login"
        }

    return render(request, "accounts/auth.html", context)

def registration_view(request, *args, **kwargs):
    form = UserCreationForm(data=request.POST or None)

    if form.is_valid():
        user = form.save(commit=True)
        user.set
        return redirect("/")

    context = {
        "form": form,
        "btn_label": "Register",
        "title": "Register"
        }
        
    return render(request, "accounts/auth.html", context)

def logout_view(request, *args, **kwargs):

    logout(request)

    return redirect("/")