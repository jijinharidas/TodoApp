from django.urls import path
from .views import todoListAPI, todoDetailAPI, allTodoAPI

urlpatterns = [
    path('', todoListAPI.as_view()),
    path('<int:pk>/', todoDetailAPI.as_view()),
    path('alltodo/', allTodoAPI.as_view()),
]
