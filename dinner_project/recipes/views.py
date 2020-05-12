from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse, reverse_lazy
from django.shortcuts import render
from django.views.generic import ListView, DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.http import HttpResponse

from recipes.models import Recipe

# Create your views here.

def index(request):
    return HttpResponse("Hello, world! This is the recipes app.")

class RecipeListView(ListView):
    model = Recipe

    template_name = 'recipes/index.html' #Specify our own template

    #by default the template variable is named 'object_list' or '<model_name>_list'

    #queryset = Recipe.objects.filter(??????)   <- gets a filtered queryset

class RecipeDetailView(DetailView):
    model = Recipe

    #by default the template variable is anmed 'object' or '<the_model_name>'

    template_name = 'recipes/detail.html'

class RecipeCreateView(CreateView):
    model = Recipe
    fields = ['name','desc','ingredients']
    template_name_suffix = '_add' #specifies that we should look for the template '<model_name>_add'

   # def form_valid(self, form):
    #    form.instance.user = self.request.user
     #   return super().form_valid(form)

#class RecipeUpdateView(generic.UpdateView):
 #   model = Recipe
  #  fields = ['name','desc','ingredients']

   # def form_valid(self, form):
    #    form.instance.user = self.request.user
     #   return super().form_valid(form)

#class RecipeDeleteView(generic.DeleteView):
 #   model = Recipe
  #  success_url = reverse_lazy('index')