from django.urls import path
from .views import todoListAPI, todoDetailAPI 

urlpatterns = [
    path('', todoListAPI.as_view()),
    path('<int:pk>/', todoDetailAPI.as_view()),
]
