from django.db import models

# Create your models here.
class Todo(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)
    class Meta:
        ordering = ['created']
