from rest_framework import serializers
from .models import Recipe, Ingredient

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('pk', 'name', 'desc', 'ingredients')

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('pk', 'name')