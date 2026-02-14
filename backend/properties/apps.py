from django.apps import AppConfig

class PropertiesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'properties'
    
    # Removed the ready() method that was causing import error
    # We'll add signals later when actually needed
