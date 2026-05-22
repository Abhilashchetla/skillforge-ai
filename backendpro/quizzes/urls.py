from django.urls import path
from .views import topic_list

urlpatterns = [
    path('topics/', topic_list),
]