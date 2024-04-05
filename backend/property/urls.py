from django.urls import path
from property import api

urlpatterns=[
    path('', api.property_list, name='api_property_list'),
    path('create/', api.create_property, name='api_create_property'),
    path('<uuid:pk>/', api.property_details, name='api_property_details'),
    path('toggle_favorite/<uuid:pk>/', api.toggle_favorite, name='api_toggle_favorite'),
    path('book/<uuid:pk>/', api.book_property, name='api_book_reservation'),
    path('reservations/<uuid:pk>/', api.property_reservation, name='api_reservation_list'),
]
