import React, { Component } from 'react';
import RecipeList from "./RecipeList";
import Grid from '@material-ui/core/Grid';
import IngredientsSearch from './IngredientsSearch';

import axios from 'axios';

import { API_URL } from '../constants/index';


class Page extends Component {
    state = {
        recipes: [],
        ingredients: []
    };

    componentDidMount() {
        this.resetState();
    }

    getRecipes = () => {
      axios.get(API_URL.concat("recipes/")).then(res => this.setState({ recipes: res.data}));  
    
    };

    getIngredients = () => {
        axios.get(API_URL.concat("ingredients/")).then(res => this.setState({ ingredients: res.data}));  
      };

    resetState = () => {
        this.getRecipes();
        this.getIngredients();
    };

    render () {
        return (
        <div>
            <Grid container spacing={3} justify='center'>
                <Grid item xs={9}>
                    <IngredientsSearch ingredients={this.state.ingredients} resetState={this.resetState} /> 
                </Grid>
                <Grid item xs={9}>
                    <RecipeList recipes={this.state.recipes} resetState={this.resetState} ingredients={this.state.ingredients}/>    
                </Grid>
            </Grid>

        </div>

        );
    }
}

export default Page;