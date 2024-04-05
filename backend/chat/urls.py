from django.urls import path
from . import api

urlpatterns=[
    path('<uuid:pk>/',api.conversation_list , name='conversation_list'),
    path('<uuid:pk>/conversation/',api.conversation_details , name='conversation_details'),
    path('start/<uuid:user_id>/conversation/',api.conversation_start , name='conversation_start'),
]