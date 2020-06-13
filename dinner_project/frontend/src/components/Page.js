import React from 'react';
import Grid from '@material-ui/core/Grid';
import IngredientsSearch from './IngredientsSearch';
import ExcludeSearch from './ExcludeSearch';
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
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';
import qs from 'qs';

import { API_URL, axiosInstance } from '../_auth/axiosConfig';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
        zIndex: 10
    },
    paper: {
        marginTop: theme.spacing(6),
        alignItems: 'center',
        flexDirection: 'column',
    },
    chip: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    recipeCards: {
        height: '100%'
    }
}));

export default function Page () {

    const classes = useStyles();

    const [recipes, setRecipes] = React.useState([]);
    const [ingredients, setIngredients] = React.useState([]);
    const [searchParams, setSearchParams] = React.useState([]);
    const [excludeParams, setExcludeParams] = React.useState([]);
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
                ingredients: searchParams,
                exclude: excludeParams

            },
            paramsSerializer: params => {
                return qs.stringify(params, {arrayFormat: 'repeat'})
            }
        }).then(res => setRecipes(res.data));

    }, [searchParams, excludeParams])

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

    const getExcludeParams = (event, value) => {
        const formattedParams = [];
        
        value.map(item => {
            formattedParams.push(item.pk);
            return formattedParams;
        });

        setExcludeParams(formattedParams);
    };

    const resetState = () => {
        axiosInstance.get(API_URL.concat("recipes/")).then(res => setRecipes(res.data));
        axiosInstance.get(API_URL.concat('ingredients/')).then(res => setIngredients(res.data));  
    };

    return (
        <React.Fragment>
            <Fab color='primary' className={classes.fab} size='large' onClick={ () => {
                getModal('new');
                handleOpen();
                }}>
                <AddIcon />
            </Fab>
                <Container component='main' maxWidth='lg' className={classes.paper}> 
                        <Grid container justify='center' spacing={3}>
                            
                            <Grid item>
                                {!recipes || recipes.length <=0 ? (
                                    <Button disabled>Pick Me a Recipe!</Button>
                                ) : ( 
                                
                                    <React.Fragment>
                                        <Button variant='contained' color='primary' onClick={ () => {
                                            getRandom();
                                            getModal('edit');
                                            handleOpen();
                                            }}>Pick Me a Recipe!</Button>
                                    </React.Fragment>
                                )}
                            </Grid>

                        </Grid>

                        <Grid container spacing={3}>

                            <Grid item xs={12} md={6} lg ={6}>
                                <IngredientsSearch ingredients={ingredients} resetState={resetState} getSearchParams={getSearchParams}/> 
                            </Grid>

                            
                            <Grid item xs={12} md={6} lg ={6}>
                                <ExcludeSearch ingredients={ingredients} resetState={resetState} getExcludeParams={getExcludeParams}/> 
                            </Grid>

                            {!recipes || recipes.length <=0 ? (
                                <Grid item>
                                    <Typography>No recipes!</Typography>
                                </Grid> 
                            ) : (recipes.map(recipe => (
                                <Grid item xs={12} md={6} lg={6} >
                                    <Card key={recipe.pk} variant="outlined" className={classes.recipeCards}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">{recipe.name}</Typography>
                                                
                                                {recipe.ingredients.map(ingredient => (
                                                <Chip label={ingredient.name} size="small" className={classes.chip} />
                                                ))}
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button color='primary' onClick={ () => {
                                                getSelected(recipe);
                                                handleOpen();
                                                getModal('edit');
                                            }} >Detail</Button>
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