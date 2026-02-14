import django_filters
from .models import Property

class PropertyFilter(django_filters.FilterSet):
    """Advanced filters for property search"""
    min_price = django_filters.NumberFilter(field_name='price_per_night', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price_per_night', lookup_expr='lte')
    min_bedrooms = django_filters.NumberFilter(field_name='bedrooms', lookup_expr='gte')
    min_bathrooms = django_filters.NumberFilter(field_name='bathrooms', lookup_expr='gte')
    min_rating = django_filters.NumberFilter(field_name='average_rating', lookup_expr='gte')
    city = django_filters.CharFilter(field_name='city', lookup_expr='iexact')
    property_type = django_filters.CharFilter(field_name='property_type', lookup_expr='iexact')
    has_wifi = django_filters.BooleanFilter(field_name='has_wifi')
    has_parking = django_filters.BooleanFilter(field_name='has_parking')
    has_pool = django_filters.BooleanFilter(field_name='has_pool')
    has_ac = django_filters.BooleanFilter(field_name='has_ac')
    instant_book = django_filters.BooleanFilter(field_name='instant_book')
    
    class Meta:
        model = Property
        fields = [
            'city', 'property_type', 'min_price', 'max_price',
            'min_bedrooms', 'min_bathrooms', 'min_rating',
            'has_wifi', 'has_parking', 'has_pool', 'has_ac',
            'instant_book'
        ]
