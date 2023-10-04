from rest_framework import viewsets, permissions, status
from .models import Post, Comment, PostImage
from .serializers import PostSerializer, CommentSerializer, PostImageSerializer
from rest_framework.filters import SearchFilter, OrderingFilter
from .permissions import AuthorOrReadOnly
from rest_framework.response import Response
from .pagination import CustomPagination


class UserPostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-posted_time')
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('category', 'content', 'location', 'author__first_name', 'author__last_name')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated, AuthorOrReadOnly]
    pagination_class = CustomPagination

    def get_queryset(self):
        queryset = Post.objects.filter(author=self.request.query_params.get('user'))
        return queryset


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-posted_time')
    filter_backends = (SearchFilter, OrderingFilter)
    search_fields = ('category', 'content', 'location', 'author__first_name', 'author__last_name')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated, AuthorOrReadOnly]
    pagination_class = CustomPagination

    def perform_create(self, serializer):
        serializer.save(author_name=self.request.user.first_name + ' ' + self.request.user.last_name,
                        author=self.request.user)

    def perform_update(self, serializer):
        serializer.save(author_name=self.request.user.first_name + ' ' + self.request.user.last_name,
                        author=self.request.user)


class CommentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, AuthorOrReadOnly]
    queryset = Comment.objects.all().order_by('-comment_time')
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.filter(post=self.request.query_params.get('post'))
        return queryset

    def perform_create(self, serializer):
        serializer.save(author_name=self.request.user.first_name + ' ' + self.request.user.last_name,
                        author=self.request.user)

    def perform_update(self, serializer):
        serializer.save(author_name=self.request.user.first_name + ' ' + self.request.user.last_name,
                        author=self.request.user)


class PostImageViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, AuthorOrReadOnly]
    queryset = PostImage.objects.all()
    serializer_class = PostImageSerializer

    #    lookup_field = 'post'

    def get_queryset(self):
        queryset = PostImage.objects.filter(post=self.request.query_params.get('post'))
        return queryset

    def perform_create(self, serializer):
        post = Post.objects.filter(pk=self.request.data['post'])[:1]
        postAuthor = post[0].author
        if postAuthor != self.request.user:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer.save(author=self.request.user)

    def perform_update(self, serializer):
        post = Post.objects.filter(pk=self.request.data['post'])[:1]
        postAuthor = post[0].author
        if postAuthor != self.request.user:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer.save(author=self.request.user)


class PostISingleImageViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, AuthorOrReadOnly]
    queryset = PostImage.objects.all()
    serializer_class = PostImageSerializer

    def get_queryset(self):
        queryset = PostImage.objects.filter(post=self.request.query_params.get('post'))[:1]
        return queryset

    def post(self):
        pass

    def put(self):
        pass

    def fetch(self):
        pass