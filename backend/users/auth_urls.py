from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views

urlpatterns = [
    path('login/', obtain_auth_token, name='api_token_auth'),
    path('register/', views.UserCreateView.as_view(), name='user_register'),
    path('logout/', views.LogoutView.as_view(), name='user_logout'),
]
