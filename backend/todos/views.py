from .serializers import TodoSerializer
from .models import Todo
from rest_framework import status, mixins, generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
# API for creating new or listing todos
class todoListAPI(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(user=user)

    serializer_class = TodoSerializer
    pagination_class = PageNumberPagination

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


# API for updating, retrieving or deleting todos
class todoDetailAPI(generics.RetrieveUpdateDestroyAPIView):

    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(user=user)
        
    serializer_class = TodoSerializer
