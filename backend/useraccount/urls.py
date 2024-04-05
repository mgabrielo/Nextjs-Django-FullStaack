from django.urls  import path
from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView, UserDetailsView
from rest_framework_simplejwt.views import TokenVerifyView


from . import api
urlpatterns=[
    path('register/', RegisterView.as_view(), name='user_registration'),
    path('login/', LoginView.as_view(), name='user_login'),
    path('logout/', LogoutView.as_view(), name='user_logout'),
    path('<uuid:pk>/', api.landlord_detail, name='landlord_detail'),
    path('myreservations/',  api.my_reservation_list, name='reservation_list'),
]