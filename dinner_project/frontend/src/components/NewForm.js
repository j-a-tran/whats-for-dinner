import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ModalWindow from './ModalWindow';
import Grid from '@material-ui/core/Grid';

import { API_URL, axiosInstance } from '../_auth/axiosConfig';

export default function NewForm(props) {

    const [ingredients, setIngredients] = React.useState([]);
    const [recipeData, setRecipeData] = React.useState({
        pk: 0,
        name: '',
        desc: ''
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

        setIngredients(formattedIngredients);
    };

    const createRecipe = (e) => {
        e.preventDefault();

        const payload = {
            pk: recipeData.pk,
            name: recipeData.name,
            desc: recipeData.desc,
            ingredients: ingredients,
            token: localStorage.getItem('access_token')
        }
        console.log(payload);

        axiosInstance.post(API_URL.concat("recipes/"), payload
        ).then(() => {
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
            <ModalWindow isOpen={props.isOpen} handleClose={props.handleClose} modalTitle="Create Recipe" actions={actions}>
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