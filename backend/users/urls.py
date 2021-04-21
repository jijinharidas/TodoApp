
from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('api/auth/register', views.RegisterAPI.as_view()),
    path('api/auth/login', views.LoginAPI.as_view()),
    path('api/auth/user', views.UserAPI.as_view()),
]
