from rest_framework.decorators import api_view
from rest_framework.response import Response
import os
import json
from openai import OpenAI
from dotenv import load_dotenv
from pathlib import Path

from .models import Topic
from .serializers import TopicSerializer

# Load .env
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR.parent / ".env")

# OpenRouter Client
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

print("API KEY LOADED:", os.getenv("OPENAI_API_KEY") is not None)


@api_view(['GET'])
def topic_list(request):
    topics = Topic.objects.all()
    serializer = TopicSerializer(topics, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def generate_quiz(request):
    try:
        topic = request.data.get("topic")
        difficulty = request.data.get("difficulty")
        count = request.data.get("count")

        prompt = f"""
Generate exactly {count} multiple choice questions about {topic}
with {difficulty} difficulty.

Rules:
1. No code snippets.
2. No multiline questions.
3. No double quotes inside questions.
4. Exactly 4 options per question.
5. Return ONLY valid JSON.

Format:

{{
  "quiz": [
    {{
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "answer": "A"
    }}
  ]
}}
"""

        response = client.chat.completions.create(
            model="openai/gpt-4.1-mini",
            response_format={"type": "json_object"},
            messages=[
                {
                    "role": "system",
                    "content": """
You must return only valid JSON.
No markdown.
No explanations.
No code snippets.
No multiline strings.

Format:
{
  "quiz": [
    {
      "question": "",
      "options": ["", "", "", ""],
      "answer": ""
    }
  ]
}
"""
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=2500
        )

        quiz_data = response.choices[0].message.content

        parsed_data = json.loads(quiz_data)

        return Response(parsed_data["quiz"])

    except Exception as e:
        print("ERROR:", str(e))

        return Response(
            {
                "error": str(e)
            },
            status=500
        )