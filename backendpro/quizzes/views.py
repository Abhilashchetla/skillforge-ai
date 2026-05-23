from rest_framework.decorators import api_view
from rest_framework.response import Response
import os
from openai import OpenAI
import json
from .models import Topic
from .serializers import TopicSerializer


@api_view(['GET'])
def topic_list(request):
    topics = Topic.objects.all()

    serializer = TopicSerializer(topics, many=True)

    return Response(serializer.data)

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

@api_view(['POST'])
def generate_quiz(request):

    topic = request.data.get('topic')
    difficulty = request.data.get('difficulty')

    prompt = f"""
    Generate 5 MCQ questions about {topic}
    with {difficulty} difficulty.

    Return ONLY valid JSON.

    Format:
    [
    {{
        "question": "question here",
        "options": ["option1", "option2", "option3", "option4"],
        "answer": "correct answer"
    }}
    ]

    Do not add explanations.
    Do not add markdown.
    """
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    quiz_data = response.choices[0].message.content

    try:
        parsed_quiz = json.loads(quiz_data)
    except:
        parsed_quiz = quiz_data

    return Response(parsed_quiz)