from django.http  import JsonResponse
from .models import User
from property.models import Reservation
from .serializer import UserDetailSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from property.serializer import  ReservationListSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def landlord_detail(request,pk):
    user = User.objects.get(pk=pk)
    serializer = UserDetailSerializer(user, many=False)
    return JsonResponse({'data': serializer.data})

@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def my_reservation_list(request):
    reservations= request.user.reservations.all()
    serializer = ReservationListSerializer(reservations,many=True)
    return JsonResponse({'data': serializer.data})

