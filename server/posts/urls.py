from django.urls import include, path
from rest_framework import routers
from .views import PostViewSet, CommentViewSet, PostImageViewSet, PostISingleImageViewSet, UserPostViewSet

router = routers.DefaultRouter()
router.register('postlist', PostViewSet)
router.register('userposts', UserPostViewSet)
router.register('image', PostImageViewSet)
router.register('simage', PostISingleImageViewSet)
router.register('comment', CommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # path('image/', PostImageViewSet.as_view()),
    # path('image/<int:pk>/', PostImageViewSet.as_view()),

]