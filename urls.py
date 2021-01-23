
from django.urls import path, include
from django.contrib import admin

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView,


urlpatterns = [
    path('admin/', admin.site.urls),

    # dj-rest-auth endpoints

    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),

    # django-rest-framework-simplejwt endpoints

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh')

]
