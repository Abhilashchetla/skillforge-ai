from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Topic
from .serializers import TopicSerializer


@api_view(['GET'])
def topic_list(request):
    topics = Topic.objects.all()

    serializer = TopicSerializer(topics, many=True)

    return Response(serializer.data)