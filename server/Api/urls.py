from users.views import RedirectView, ActiveView
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from users.views import CustomTokenObtainPairView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('password/reset/confirm/<uid>/<token>/', RedirectView),
    path('activate/<uid>/<token>/', ActiveView),
    path('api/profile/', include('users.urls')),
    path('api/posts/', include('posts.urls')),
    # path('auth/jwt/token/', CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair')

]
urlpatterns += static(settings.MEDIA_URL,
                      document_root=settings.MEDIA_ROOT)