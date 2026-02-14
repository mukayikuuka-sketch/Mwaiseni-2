from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from .models import Property
from .serializers import PropertySerializer, PropertyListSerializer
from .filters import PropertyFilter

class PropertyViewSet(viewsets.ModelViewSet):
    """ViewSet for Property model - Booking.com style API"""
    queryset = Property.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = PropertyFilter
    search_fields = ['title', 'description', 'address', 'city']
    ordering_fields = ['price_per_night', 'average_rating', 'created_at']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return PropertyListSerializer
        return PropertySerializer
    
    def perform_create(self, serializer):
        # Automatically set the host to the current user
        serializer.save(host=self.request.user)
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured properties (highly rated and available)"""
        featured_properties = Property.objects.filter(
            is_available=True,
            average_rating__gte=4.0
        ).order_by('-average_rating')[:10]
        serializer = self.get_serializer(featured_properties, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Advanced search endpoint"""
        queryset = self.filter_queryset(self.get_queryset())
        
        # Apply additional filters from query params
        city = request.query_params.get('city', None)
        if city:
            queryset = queryset.filter(city=city)
        
        min_price = request.query_params.get('min_price', None)
        max_price = request.query_params.get('max_price', None)
        if min_price:
            queryset = queryset.filter(price_per_night__gte=min_price)
        if max_price:
            queryset = queryset.filter(price_per_night__lte=max_price)
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
