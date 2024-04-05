from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .models import Property, Reservation, User
from .serializer import PropertyListSerializer, PropertyDetailSerializer, ReservationListSerializer
from .forms  import PropertyForm
from rest_framework.authentication import TokenAuthentication
# from django.contrib.auth.models import AnonymousUser
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken 

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def property_list(request):
    try:
        token = request.META['HTTP_AUTHORIZATION'].split('Bearer ')[1]
        token= AccessToken(token)
        user_id = token.payload['user_id']
        user = User.objects.get(pk=user_id)
        print('props-user',user)
    except Exception as e:
        user= None
    properties= Property.objects.all()
    landlord_id =request.GET.get('landlord_id','')
    is_favorites= request.GET.get('is_favorites','')
    #filter by landlord
    if landlord_id:
        properties= properties.filter(landlord_id=landlord_id)
    #filter by favorites
    if is_favorites:
        properties=properties.filter(favorited__in=[user])
    serializer= PropertyListSerializer(properties, many=True)
    return JsonResponse({
        'data': {
            'property_data': serializer.data, 
        }
    })


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def property_details(request, pk):
    property= Property.objects.get(pk=pk)
    if property :
        serializer= PropertyDetailSerializer(property, many=False)
        return JsonResponse({'data': serializer.data}, status=200)
    else:
        return JsonResponse({'error': 'property does not exist'}, status=400)
    
@api_view(['POST', 'FILES'])
@permission_classes([IsAuthenticated]) 
def create_property(request):
    form = PropertyForm(request.POST, request.FILES)
    if form.is_valid():
        property = form.save(commit=False)
        property.landlord= request.user
        property.save()
        return JsonResponse({'success': True})
    else:
        print('error',form.errors, form.non_field_errors)
        return JsonResponse({'errors':form.errors.as_json()}, status=400)

@api_view(["POST"])
@authentication_classes([])
@permission_classes([])
def book_property(request,pk):
    try:
        start_date=request.data['start_date']
        end_date=request.data['end_date']
        number_of_nights=request.data['number_of_nights']
        total_price=request.data['total_price']
        guests=request.data['guests']
        userId=request.data['user_id']

        property = Property.objects.get(pk=pk)
        user = User.objects.get(pk=userId)
        Reservation.objects.create(
            property=property,
            start_date=start_date,
            end_date=end_date,
            number_of_nights=number_of_nights,
            total_price=total_price,
            guests=guests,
            created_by=user
        )
        return JsonResponse({'success':True})
    except Exception as e:
        print('Error-', e)
        return JsonResponse({'sucess':False})    

@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def property_reservation(request,pk):
    property=Property.objects.get(pk=pk)
    reservation=property.reservations.all()
    serializer= ReservationListSerializer(reservation, many=True)
    return JsonResponse({'data':serializer.data})
    # Alternative - return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def toggle_favorite(request,pk):
    property=Property.objects.get(pk=pk)
    print('user',request.user)
    if request.user in property.favorited.all():
        property.favorited.remove(request.user)
        return JsonResponse({'data':{'is_favorite': False}})
    else:
        property.favorited.add(request.user)
        return JsonResponse({'data': {'is_favorite': True}})


