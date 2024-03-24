from rest_framework import serializers
from .models import Property
from useraccount.serializer import UserDetailSerializer

class PropertyListSerializer(serializers.ModelSerializer):
    class Meta:
        model= Property
        fields=(
            'id',
            'title',
            'price_per_night',
            'image_url'
        )

class PropertyDetailSerializer(serializers.ModelSerializer):
    landlord= UserDetailSerializer(read_only=True, many=False)
    class Meta:
        model= Property
        fields=(
            'id',
            'title',
            'price_per_night',
            'image_url',
            'bedrooms',
            'bathrooms',
            'guests',
            'landlord',
        )