"""
🏆 ELITE USERS APP - ZAMSTAY USER MANAGEMENT
World-class user management system for global booking platform
"""

from django.apps import AppConfig


class EliteUsersConfig(AppConfig):
    """Gold Standard Users Configuration"""
    
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
    verbose_name = '🏆 Elite User Management'
    
    def ready(self):
        """Initialize elite user signals"""
        try:
            import users.signals
            print("✅ Elite users signals loaded")
        except ImportError:
            # Signals will be added when needed
            pass
