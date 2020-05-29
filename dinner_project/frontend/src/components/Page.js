import React, { Component } from 'react';
import RecipeList from "./RecipeList";
import Grid from '@material-ui/core/Grid';
import IngredientsSearch from './IngredientsSearch';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import DeleteForm from './DeleteForm';
import EditForm from './EditForm';
import GridList from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';

import axios from 'axios';

import { API_URL } from '../constants/index';
import RecipeForm from './RecipeForm';


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
            <React.Fragment>
            <RecipeForm ingredients={this.state.ingredients} resetState={this.resetState} />
            <Container> 
                <Grid container spacing={3}>
                    <Grid item xs={9} md={9} lg ={12}>
                        <IngredientsSearch ingredients={this.state.ingredients} resetState={this.resetState} /> 
                    </Grid>

                    {this.state.recipes.map(recipe => (
                        <Grid item xs={9} md={6} lg={6} spacing={2}>
                            <Card key={recipe.pk} variant="outlined">
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">{recipe.name}</Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">{recipe.desc}</Typography>
                                        {recipe.ingredients.map(ingredient => (
                                        <Chip label={ingredient.name} size="small" />
                                        ))}
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <EditForm recipe={recipe} ingredients={this.state.ingredients} resetState={this.resetState}/>
                                    <DeleteForm recipe={recipe} resetState={this.resetState}/>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}


                </Grid>
            </Container>
        </React.Fragment>

        );
    }
}

export default Page;