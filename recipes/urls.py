from django.urls import path
from . import views
from rest_framework_simplejwt import views as jwt_views
from django.views.generic import TemplateView

urlpatterns = [
    path('api/recipes/', views.recipes_list),
    path('api/recipes/<int:pk>', views.recipes_detail),
    path('api/ingredients/', views.ingredients_list),
    path('api/token/obtain/', views.CustomObtainTokenPairView.as_view(), name='token-create'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token-refresh'),
    path('api/token/verify/', jwt_views.TokenVerifyView.as_view(), name='token-verify'),
    path('api/user/create/', views.create_user, name='user-create'),
    path('api/token/blacklist/', views.logout_and_blacklist_token, name='blacklist'),
    path('', TemplateView.as_view(template_name='index.html'))
]