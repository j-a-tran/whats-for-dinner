import React, { Component } from 'react';
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
import Button from '@material-ui/core/Button';

import axios from 'axios';
import qs from 'qs';

import { API_URL } from '../constants/index';
import NewForm from './NewForm';


export default function Page () {

    const [recipes, setRecipes] = React.useState([]);
    const [ingredients, setIngredients] = React.useState([]);
    const [searchParams, setSearchParams] = React.useState([]);
    const [randomRec, setRandomRec] = React.useState({});

    React.useEffect(() =>  {
        axios.get(API_URL.concat("recipes/")).then(res => setRecipes(res.data));
        axios.get(API_URL.concat('ingredients/')).then(res => setIngredients(res.data));
    }, []);

    React.useEffect(() => {
        axios.get(API_URL.concat("recipes/"),{
            params: {
                ingredients: searchParams
            },
            paramsSerializer: params => {
                return qs.stringify(params, {arrayFormat: 'repeat'})
            }
        }).then(res => setRecipes(res.data));

        setRandomRec('');

    }, [searchParams])

    const getRandom = () => {
        setRandomRec(recipes[Math.floor(Math.random()*recipes.length)]);
    };

    const getSearchParams = (event, value) => {
        const formattedParams = [];
        
        value.map(item => {
            formattedParams.push(item.pk);
        });

        setSearchParams(formattedParams);
    };

    const resetState = () => {
        axios.get(API_URL.concat("recipes/")).then(res => setRecipes(res.data));
        axios.get(API_URL.concat('ingredients/')).then(res => setIngredients(res.data));  
    };

    return (
        <React.Fragment>
            <NewForm ingredients={ingredients} resetState={resetState} />
                <Container> 
                        <Grid container spacing={3}>
                        
                        {!recipes || recipes.length <=0 ? (
                            <Button disabled>Randomize Me!</Button>
                        ) : ( 
                        
                            <React.Fragment>
                                 <Button variant='contained' onClick={getRandom}>Randomize Me!</Button>
                            <Typography>{randomRec.name}</Typography>

                            </React.Fragment>
                           
                        )}

                        <Grid item xs={9} md={9} lg ={12}>
                            <IngredientsSearch ingredients={ingredients} resetState={resetState} getSearchParams={getSearchParams}/> 
                        </Grid>

                        {!recipes || recipes.length <=0 ? (
                            <Grid item>
                                <Typography>No recipes!</Typography>
                            </Grid> 
                        ) : (recipes.map(recipe => (
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
                                        <EditForm recipe={recipe} ingredients={ingredients} buttonType='edit' resetState={resetState}/>
                                        <DeleteForm recipe={recipe} resetState={resetState}/>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )))}

                    </Grid>
                </Container>
        </React.Fragment>

        );
    
}