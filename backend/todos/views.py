from .serializers import TodoSerializer
from .models import Todo
from rest_framework import status, mixins, generics
from rest_framework.pagination import PageNumberPagination

# API for creating new or listing todos
class todoListAPI(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    pagination_class = PageNumberPagination

# API for updating, retrieving or deleting todos
class todoDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class allTodoAPI(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
