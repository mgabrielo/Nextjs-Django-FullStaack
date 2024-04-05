import uuid
from django.db import models
from useraccount.models import User
# Create your models here.
class Conversation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    users=models.ManyToManyField(User, related_name='conversations')
    created_at=models.DateTimeField(auto_now_add=True)
    modified_at=models.DateTimeField(auto_now=True)

class ConversationMessage(models.Model):
    id= models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    body = models.TextField(blank=False)
    conversation= models.ForeignKey(Conversation, related_name='messages',on_delete=models.CASCADE)
    sent_to=models.ForeignKey(User, related_name='received_messages',on_delete=models.CASCADE)
    created_by=models.ForeignKey(User, related_name='sent_messages',on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)