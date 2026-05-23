from django.urls import path
from .views import topic_list
from .views import topic_list, generate_quiz

urlpatterns = [
    path('topics/', topic_list),
    path('generate-quiz/', generate_quiz),
]