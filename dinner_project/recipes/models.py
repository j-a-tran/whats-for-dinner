from django.db import models
from django.urls import reverse, reverse_lazy
#from django.contrib.auth.models import User

# Create your models here.

class Ingredient(models.Model):
    name = models.CharField(max_length=60)
    #user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Recipe(models.Model):
    name = models.CharField(max_length=200, help_text='Enter the recipe name.')
    desc = models.TextField(help_text='Enter the recipe steps.', blank=True )
    ingredients = models.ManyToManyField(Ingredient)
    #user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse('recipe-detail', kwargs={'pk':self.pk})

    #def select_random(self):
        #TO DO: method for selecting a random entry from the user's list of recipes