from django.contrib import admin
from . import views
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
import os

urlpatterns = [
    path('', views.index, name='index'),
    # Admin - MUST come first
    path('admin/', admin.site.urls),
    
    # API routes
    path('api/', include('api.urls')),
    
    # Frontend React app - BUT NOT for admin paths
    # This ONLY matches the root URL, not /admin/
    path('', TemplateView.as_view(template_name='index.html')),
]

# Remove the problematic catch-all:
# re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
# This line was catching /admin/ before Django admin could handle it

# Serve static files in development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static('/static/dist/', document_root=os.path.join(settings.BASE_DIR, 'static', 'dist'))

