from django.urls  import path
from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from rest_framework_simplejwt.views import TokenVerifyView

urlpatterns=[
    path('register/', RegisterView.as_view(), name='user_registration'),
    path('login/', LoginView.as_view(), name='user_login'),
    path('logout/', LogoutView.as_view(), name='user_logout'),
    path('user/', UserDetailsView.as_view(), name='user_details'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]