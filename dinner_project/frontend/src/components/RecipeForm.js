import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ModalWindow from './ModalWindow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import { API_URL } from '../constants/index';

export default function RecipeForm(props) {

    const [isOpen, setOpen] = React.useState(false);
    const [ingredients, setIngredients] = React.useState([]);
    const [recipeData, setRecipeData] = React.useState({
        pk: 0,
        name: '',
        desc: ''
    });
    
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChange = (event) => {
        recipeData[event.target.name] = event.target.value
    };

    const onIngredientsChange = (event, value) => {
        const formattedIngredients = value.map( item => {
            const object = {};
            object.name = item;

            return object;
        })

        setIngredients(formattedIngredients);
    };

    const createRecipe = (e) => {
        e.preventDefault();

        const payload = {
            pk: recipeData.pk,
            name: recipeData.name,
            desc: recipeData.desc,
            ingredients: ingredients
        }

        axios.post(API_URL.concat("recipes/"), payload
        ).then(() => {
            props.resetState();
            handleClose();
        })
    };

    const actions = [
        <Button type="submit" form="recipeForm">Save</Button>,
        <Button onClick={handleClose}>Close</Button>
    ];

    return (
        <React.Fragment>
            <Fab color='primary' onClick={handleOpen}>
                <AddIcon />
            </Fab>
            <ModalWindow isOpen={isOpen} handleClose={handleClose} modalTitle="Create Recipe" actions={actions}>
                <form noValidate autoComplete='off' onSubmit={createRecipe} id="recipeForm">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField required fullWidth name="name" label="Name" onChange={onChange} />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField fullWidth name="desc" label="Description" multiline rows={4} onChange={onChange} />

                            </Grid>

                            <Grid item xs={12}>
                                <Autocomplete 
                                multiple
                                id="ingredients"
                                options={props.ingredients.map((option) => option.name)}
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    variant="standard"
                                    label="Ingredients"
                                    placeholder="Select ingredients"
                                    />
                                )}
                                onChange={onIngredientsChange}
                                freeSolo
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                />

                            </Grid>
                        
                        
                        

                        
                    </Grid>
                </form>
            </ModalWindow>
        </React.Fragment>
    )
}