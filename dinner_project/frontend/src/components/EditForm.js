import React from 'react';
import Button from '@material-ui/core/Button';
import ModalWindow from './ModalWindow';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import { API_URL, axiosInstance } from '../_auth/axiosConfig';

export default function DeleteForm(props) {
    
    const recipe = props.recipe;

    const [recipeIngredients, setRecipeIngredients] = React.useState(recipe.ingredients);
    const [recipeData, setRecipeData] = React.useState({
        pk: recipe.pk,
        name: recipe.name,
        desc: recipe.desc
    });

    const onChange = (event) => {
        recipeData[event.target.name] = event.target.value
    };

    const onIngredientsChange = (event, value) => {
        const formattedIngredients = value.map( item => {
            const object = {};
            object.name = item;

            return object;
        })

        setRecipeIngredients(formattedIngredients);
    };

    const editRecipe = (e) => {
        e.preventDefault();

        const payload = {
            pk: recipeData.pk,
            name: recipeData.name,
            desc: recipeData.desc,
            ingredients: recipeIngredients
        }

        console.log(payload);

        axiosInstance.put(API_URL + "recipes/" + recipe.pk, payload).then( () => {
            props.resetState();
            props.handleClose();
        })
    };

    const actions = [
        <Button type="submit" form="recipeForm">Save</Button>,
        <Button onClick={props.handleClose}>Close</Button>
    ];


    return (
        <React.Fragment>
            <ModalWindow isOpen={props.isOpen} handleClose={props.handleClose} modalTitle={recipe.name} actions={actions}>
                <form noValidate autoComplete='off' onSubmit={editRecipe} id="recipeForm">
                    <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField required fullWidth name="name" label="Name" defaultValue={recipe.name} onChange={onChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth name="desc" label="Description" multiline rows={4} defaultValue={recipe.desc} onChange={onChange} />
                            </Grid>
                    
                            <Grid item xs={12}>
                                <Autocomplete 
                                    multiple
                                    id="ingredients"
                                    options={props.ingredients.map((option) => option.name)}
                                    defaultValue={recipe.ingredients.map((option) => option.name)}
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