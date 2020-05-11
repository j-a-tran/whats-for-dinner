from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:pk>', views.RecipeDetailView.as_view(), name='recipe-detail'),
    path('list', views.RecipeListView.as_view(), name='recipe-list'),
    #path('recipes/add/', views.RecipeCreateView.as_view(),name='recipe-add'),
    #path('recipes/<int:pk>/', views.RecipeUpdateView.as_view(), name='recipe-update'),
    #path('recipes/<int:pk>/delete', views.RecipeDeleteView.as_view(), name='recipe-delete'),
]