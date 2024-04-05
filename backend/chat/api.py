from django.http import JsonResponse
from rest_framework.decorators import api_view,authentication_classes, permission_classes
from .models import Conversation, ConversationMessage,User
from .serializer import ConversationListSerializer, ConversationDetailSerializer, ConversationMessageSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework_simplejwt.tokens import AccessToken 

@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def conversation_list(request,pk):
    try:
        user = User.objects.get(pk=pk)
    except Exception as e:
        user= None
    serializer=ConversationListSerializer(user.conversations.all(), many=True)
    return JsonResponse({'data':serializer.data})

@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def conversation_details(request,pk):
    # print('user',request.user)
    conversation=  request.user.conversations.get(pk=pk)
    conversation_serializer= ConversationDetailSerializer(conversation, many=False)
    message_serializer=ConversationMessageSerializer(conversation.messages.all(), many=True)
    return JsonResponse({'data': {
        'conversation':conversation_serializer.data,
        'messages': message_serializer.data
    }})

@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def conversation_start(request, user_id):
    # print('user', request.user)
    conversations=Conversation.objects.filter(users__in=[user_id]).filter(users__in=[request.user.id])

    if conversations.count() > 0:
        conversation= conversations.first()
        return JsonResponse({'data': {
            'success':True,
            'conversation_id':conversation.id
        }})
    else:
        user= User.objects.get(pk=user_id)
        conversation=Conversation.objects.create()
        conversation.users.add(request.user)
        conversation.users.add(user)
        return JsonResponse({'data': {
            'success':True,
            'conversation_id':conversation.id
        }})

