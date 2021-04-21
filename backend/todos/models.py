from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Todo(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    class Meta:
        ordering = ['created']
