from django.http  import JsonResponse
from .models import User
from property.models import Reservation
from .serializer import UserDetailSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from property.serializer import  ReservationListSerializer

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def landlord_detail(request,pk):
    user = User.objects.get(pk=pk)
    serializer = UserDetailSerializer(user, many=False)
    return JsonResponse({'data': serializer.data})

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def reservation_list(request, pk):
    reservations= Reservation.objects.all()
    filter_reservations = reservations.filter(created_by=pk)
    serializer = ReservationListSerializer(filter_reservations,many=True)
    return JsonResponse({'data': serializer.data})

