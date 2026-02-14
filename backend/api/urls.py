from django.urls import path, include

urlpatterns = [
    path('properties/', include('properties.urls')),
    path('bookings/', include('bookings.urls')),
    path('users/', include('users.urls')),
    path('auth/', include('users.auth_urls')),
    path('reviews/', include('reviews.urls')),
    path('payments/', include('payments.urls')),
    path('analytics/', include('analytics.urls')),
    path('messaging/', include('messaging.urls')),
]
