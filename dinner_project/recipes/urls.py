from django.urls import path
from . import views

urlpatterns = [
    path('', views.RecipeListView.as_view(), name='index'),
    path('<int:pk>', views.RecipeDetailView.as_view(), name='recipe-detail'),
    path('list', views.RecipeListView.as_view(), name='recipe-list'),
    path('add', views.RecipeCreateView.as_view(), name='recipe-add'),
    path('<int:pk>/edit', views.RecipeUpdateView.as_view(), name='recipe-edit'),
    path('<int:pk>/delete', views.RecipeDeleteView.as_view(), name='recipe-delete')
    #path('recipes/add/', views.RecipeCreateView.as_view(),name='recipe-add'),
    #path('recipes/<int:pk>/', views.RecipeUpdateView.as_view(), name='recipe-update'),
    #path('recipes/<int:pk>/delete', views.RecipeDeleteView.as_view(), name='recipe-delete'),
]