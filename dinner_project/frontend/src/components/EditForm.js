import React from 'react';
import Button from '@material-ui/core/Button';
import ModalWindow from './ModalWindow';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import axios from 'axios';
import { API_URL } from '../constants/index';

export default function DeleteForm(props) {
    
    const recipe = props.recipe;

    const [isOpen, setOpen] = React.useState(false);
    const [recipeIngredients, setRecipeIngredients] = React.useState([recipe.ingredients]);
    const [recipeData, setRecipeData] = React.useState({
        pk: recipe.pk,
        name: recipe.name,
        desc: recipe.desc
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

        axios.put(API_URL + "recipes/" + recipe.pk, payload).then( () => {
            handleClose();
        })
    };

    const actions = [
        <Button type="submit" form="recipeForm">Save</Button>,
        <Button onClick={handleClose}>Close</Button>
    ];

    return (
        <React.Fragment>
            <Button color='primary' onClick={handleOpen}>
                Edit
            </Button>
            <ModalWindow isOpen={isOpen} handleClose={handleClose} modalTitle={'Edit "' + recipe.name + '"'} actions={actions}>
                <form noValidate autoComplete='off' onSubmit={editRecipe} id="recipeForm">
                    <TextField required name="name" label="Name" defaultValue={recipe.name} onChange={onChange} />
                    <TextField name="desc" label="Description" defaultValue={recipe.desc} onChange={onChange} />

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
                </form>
            </ModalWindow>
        </React.Fragment>
    )

}