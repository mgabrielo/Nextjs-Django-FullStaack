from django.contrib.auth.models import AnonymousUser
from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from rest_framework_simplejwt.tokens import AccessToken
from useraccount.models import User
from rest_framework.decorators import api_view,authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated


@database_sync_to_async
def get_user(token_key):
    try:
        token= AccessToken(token=token_key)
        user_id = token.payload['user_id']
        user=User.objects.get(pk=user_id) 
        return user
    except Exception as e:
        return AnonymousUser

class TokenAuthMiddleware(BaseMiddleware):
    def __init__(self, inner):
        self.inner=inner

    async def __call__(self, scope, receive, send):
        query=dict((x.split('=') for x in scope['query_string'].decode().split('&')))
        token_key=query.get('token')
        scope['user'] = await get_user(token_key)
        # print('user_scope',scope['user'])
        return await super().__call__(scope,receive,send)