from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse, reverse_lazy
from django.shortcuts import render
from django.views.generic import ListView, DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.http import HttpResponse

import random

from .forms import SearchForm
from recipes.models import Recipe, Ingredient

# Create your views here.

class RecipeListView(ListView):
    model = Recipe
    template_name = 'recipes/index.html' #Specify our own template

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['form'] = SearchForm()
        return context

    #by default the template variable is named 'object_list' or '<model_name>_list'

    #queryset = Recipe.objects.filter(??????)   <- gets a filtered queryset

class RecipeSearchResults(ListView):
    model = Recipe
    template_name = 'recipes/results.html'

    def get_queryset(self):
        query = self.request.GET.getlist('ingredients')
        randomize_flag = self.request.GET.get('randomize')
        
        if randomize_flag == "Pick Random":
            object_list = random.sample(list(Recipe.objects.filter(ingredients__in=query).distinct()),1)
        else:
            object_list = Recipe.objects.filter(ingredients__in=query).distinct()

        return object_list

        #q = Ingredient.objects.get(pk=query)
        #object_list = q.recipe_set.all()

class RecipeDetailView(DetailView):
    model = Recipe

    #by default the template variable is anmed 'object' or '<the_model_name>'

    template_name = 'recipes/detail.html'

class RecipeCreateView(CreateView):
    model = Recipe
    fields = ['name','desc','ingredients']
    template_name_suffix = '_add' #specifies that we should look for the template '<model_name>_add'

class RecipeUpdateView(UpdateView):
    model = Recipe
    fields = ['name','desc','ingredients']
    template_name_suffix = '_edit'

class RecipeDeleteView(DeleteView):
    model = Recipe
    success_url = reverse_lazy('index')
    template_name_suffix = '_delete'
