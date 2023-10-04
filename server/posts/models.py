from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
User = get_user_model()


class Post(models.Model):
    category = models.CharField(max_length=1000, null=False)
    content = models.TextField(max_length=50000, null=False)
    location = models.CharField(max_length=34, null=True, blank=True)
    posted_time = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    author_name = models.CharField(max_length=100, null=False, default='blogger')

    def __str__(self):
        return self.category


class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/', null=True, blank=False)

    def __str__(self):
        return self.post.category


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    author_name = models.CharField(max_length=100, null=False, default='viewer')
    comment_time = models.DateTimeField(default=timezone.now)
    content = models.TextField(max_length=1000, null=False)

    def __str__(self):
        return self.post.category