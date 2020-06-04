from rest_framework import serializers
from .models import Recipe, Ingredient
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'password')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        
        if password is not None:
            instance.set_password(password)
        instance.save()

        return instance

class IngredientSerializer(serializers.ModelSerializer):
    
    user = UserSerializer(many=False)

    class Meta:
        model = Ingredient
        fields = ['pk','name','user']

class RecipeSerializer(serializers.ModelSerializer):

    ingredients = IngredientSerializer(many=True)
    user = UserSerializer(many=False)

    class Meta:
        model = Recipe
        fields = ['pk', 'name', 'desc', 'ingredients','user']
    
    def create(self, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        recipe = Recipe.objects.create(**validated_data)
        for ingredient in ingredients_data:
            ingredient, created = Ingredient.objects.get_or_create(name=ingredient['name']) ##this works for getting or adding an ingredient
            recipe.ingredients.add(ingredient)
        return recipe

    ##editing name and desc only works if you also edit ingredients
    def update(self, instance, validated_data):
        ingredients_data = validated_data.pop('ingredients')
        instance.name = validated_data.get('name', instance.name)
        instance.desc = validated_data.get('desc', instance.desc)
        instance.ingredients.clear()
        instance.save()
        for ingredient in ingredients_data:
            ingredient, created = Ingredient.objects.get_or_create(name=ingredient['name'])
            instance.ingredients.add(ingredient)
        
        return instance
