from django.urls import path 
from .views import get_screenshot

urlpatterns = [
    path('',get_screenshot)
]