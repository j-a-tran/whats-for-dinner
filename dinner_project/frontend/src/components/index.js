import React, { Component } from 'react';
import RecipeList from "./RecipeList";


import axios from 'axios';

import { API_URL } from '../constants/index';

class Index extends Component {
    state = {
        recipes: []
    };

    componentDidMount() {
        this.resetState();
    }

    getRecipes = () => {
      axios.get(API_URL).then(res => this.setState({ recipes: res.data}));  
    };

    resetState = () => {
        this.getRecipes();
    };

    render () {
        return (
        <div>
            <RecipeList recipes={this.state.recipes} resetState={this.resetState} />

        </div>
        );
    }
}

export default Index;