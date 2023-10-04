from django.shortcuts import redirect
# from .models import User

from django.contrib.auth import get_user_model
User = get_user_model()
from .serializers import UserDetailSerializer
from .permissions import AuthorOrReadOnly
from rest_framework import permissions
from djoser.views import UserViewSet
FrontEndUrl = 'https://blogest-blogest.web.app/'


class UserViewSet(UserViewSet):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [permissions.IsAuthenticated, AuthorOrReadOnly]

    # lookup_field = 'author'0

    def get_queryset(self):
        queryset = User.objects.filter(id=self.request.query_params.get('uid'))
        return queryset

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_update(self, serializer):
        serializer.save(author=self.request.user)


def RedirectView(self, uid, token):
    return redirect(f'{FrontEndUrl}password/reset/confirm/{uid}/{token}/')


def ActiveView(self, uid, token):
    return redirect(f'{FrontEndUrl}activate/{uid}/{token}/')


from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer