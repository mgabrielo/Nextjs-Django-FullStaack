from django.urls import path
from property import api

urlpatterns=[
    path('', api.property_list, name='api_property_list'),
    path('create/', api.create_property, name='api_create_property'),
    path('<uuid:pk>/', api.property_details, name='api_property_details'),
]
