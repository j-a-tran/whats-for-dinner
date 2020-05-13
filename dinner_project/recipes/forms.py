from django import forms
from .models import Recipe, Ingredient

# Create the form class.
class SearchForm(forms.ModelForm):
     class Meta:
         model = Recipe
         fields = ['ingredients']

         widgets = {'ingredients': forms.Select()}
