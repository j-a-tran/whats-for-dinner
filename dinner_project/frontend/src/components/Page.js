import React from 'react';
import Grid from '@material-ui/core/Grid';
import IngredientsSearch from './IngredientsSearch';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ModalRouter from './ModalRouter';

import axios from 'axios';
import qs from 'qs';

import { API_URL, axiosInstance } from '../_auth/axiosConfig';

export default function Page () {

    const [recipes, setRecipes] = React.useState([]);
    const [ingredients, setIngredients] = React.useState([]);
    const [searchParams, setSearchParams] = React.useState([]);
    const [selectedRec, setSelectedRec] = React.useState({});
    const [isOpen, setOpen] = React.useState(false);
    const [currentModal, setCurrentModal] = React.useState(null);

    React.useEffect(() =>  {
        axiosInstance.get(API_URL.concat("recipes/")).then(res => setRecipes(res.data));
        axiosInstance.get(API_URL.concat('ingredients/')).then(res => setIngredients(res.data));
    }, []);

    React.useEffect(() => {

        axiosInstance.get(API_URL.concat("recipes/"),{
            params: {
                ingredients: searchParams
            },
            paramsSerializer: params => {
                return qs.stringify(params, {arrayFormat: 'repeat'})
            }
        }).then(res => setRecipes(res.data));

    }, [searchParams])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getSelected = (recipe) => {
        setSelectedRec(recipes.find(r => r.pk === recipe.pk))
    };

    const getRandom = () => {
        setSelectedRec(recipes[Math.floor(Math.random()*recipes.length)]);
    };

    const getModal = (modal) => {
        setCurrentModal(modal);
    };

    const getSearchParams = (event, value) => {
        const formattedParams = [];
        
        value.map(item => {
            formattedParams.push(item.pk);
            return formattedParams;
        });

        setSearchParams(formattedParams);
    };

    const resetState = () => {
        axiosInstance.get(API_URL.concat("recipes/")).then(res => setRecipes(res.data));
        axiosInstance.get(API_URL.concat('ingredients/')).then(res => setIngredients(res.data));  
    };

    return (
        <React.Fragment>
            <Fab color='primary' onClick={ () => {
                getModal('new');
                handleOpen();
                }}>
                <AddIcon />
            </Fab>
                <Container> 
                        <Grid container spacing={3}>
                        
                        {!recipes || recipes.length <=0 ? (
                            <Button disabled>Randomize Me!</Button>
                        ) : ( 
                        
                            <React.Fragment>
                                 <Button variant='contained' onClick={ () => {
                                     getRandom();
                                     getModal('edit');
                                     handleOpen();
                                    }}>Randomize Me!</Button>
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
                                        <Button color='primary' onClick={ () => {
                                            getSelected(recipe);
                                            handleOpen();
                                            getModal('edit');
                                        }} >Edit</Button>
                                        <Button color='primary' onClick={ () => {
                                            getSelected(recipe);
                                            handleOpen();
                                            getModal('delete');
                                        }}>Delete</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )))}

                    </Grid>
                </Container>
                <ModalRouter currentModal={currentModal} isOpen={isOpen} handleClose={handleClose} recipe={selectedRec} ingredients={ingredients} resetState={resetState}/>
        </React.Fragment>
        );
    
}