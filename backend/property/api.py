from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .models import Property
from .serializer import PropertyListSerializer, PropertyDetailSerializer
from .forms  import PropertyForm

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def property_list(request):
    properties= Property.objects.all()
    serializer= PropertyListSerializer(properties, many=True)
    return JsonResponse({
        'data': serializer.data
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
    