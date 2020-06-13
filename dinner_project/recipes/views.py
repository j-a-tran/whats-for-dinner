from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework_simplejwt.authentication import JWTAuthentication

import random

from .models import Recipe, Ingredient
from .serializers import *

# Create your views here.

@api_view(['GET','POST'])
def recipes_list(request):
    JWT = JWTAuthentication()
    request_data = JWT.authenticate(request) ##returns a tuple with user, token
    print(request_data[0])
    user = request_data[0] ##extracts user from the tuple

    if request.method == 'GET':
        data = user.recipe_set.all()

        query = request.GET.getlist('ingredients')
        exclusions = request.GET.getlist('exclude')

        if query:
        ##  data = Recipe.objects.filter(ingredients__in=query).distinct()
            data = user.recipe_set.all().filter(ingredients__in=query).distinct()

        if exclusions:
            data = data.exclude(ingredients__in=exclusions)
            
        serializer  = RecipeSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = RecipeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT', 'DELETE'])
def recipes_detail(request, pk):
    JWT = JWTAuthentication()
    request_data = JWT.authenticate(request) ##returns a tuple with user, token
    print(request_data[0])
    user = request_data[0]

    try:
        recipe = Recipe.objects.get(pk=pk)
    except Recipe.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = RecipeSerializer(recipe, data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        recipe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET','POST'])
def ingredients_list(request):

    JWT = JWTAuthentication()
    request_data = JWT.authenticate(request) ##returns a tuple with user, token
    print(request_data[0])
    user = request_data[0]

    if request.method == 'GET':
        data = user.ingredient_set.all()

        serializer  = IngredientSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = IngredientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
@authentication_classes([])
def create_user(request):
    
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
@authentication_classes([])
def logout_and_blacklist_token(request):
    try:
        refresh_token = request.data['refresh_token']
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)

class CustomObtainTokenPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer