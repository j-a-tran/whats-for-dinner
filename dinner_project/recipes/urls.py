from django.urls import path
from . import views
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('', views.RecipeListView.as_view(), name='index'),
    path('recipe/<int:pk>', views.RecipeDetailView.as_view(), name='recipe-detail'),
    path('list', views.RecipeListView.as_view(), name='recipe-list'),
    path('recipe/add', views.RecipeCreateView.as_view(), name='recipe-add'),
    path('recipe/<int:pk>/edit', views.RecipeUpdateView.as_view(), name='recipe-edit'),
    path('recipe/<int:pk>/delete', views.RecipeDeleteView.as_view(), name='recipe-delete'),
    path('recipe/search', views.RecipeSearchResults.as_view(), name='recipe-results'),
    path('api/recipes/', views.recipes_list),
    path('api/recipes/<int:pk>', views.recipes_detail),
    path('api/ingredients/', views.ingredients_list),
    path('api/token/obtain/', views.CustomObtainTokenPairView.as_view(), name='token-create'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/user/create/', views.create_user, name='user-create'),
    path('api/token/blacklist/', views.logout_and_blacklist_token, name='blacklist')
]