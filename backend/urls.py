from django.urls import path
from .views import register_user
from .views_properties import create_property
from .views_booking import create_booking, get_user_bookings
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('properties/create/', create_property, name='create_property'),
    path('bookings/create/', create_booking, name='create_booking'),
    path('bookings/my/', get_user_bookings, name='my_bookings'),
]

