from rest_framework import serializers
from .models import User
from django.contrib.auth import get_user_model
# User = get_user_model()
from djoser.serializers import UserCreateSerializer


class UserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        data['email'] = self.user.email
        return data