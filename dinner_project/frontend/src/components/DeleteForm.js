import React from 'react';
import Button from '@material-ui/core/Button';
import ModalWindow from './ModalWindow';

import axios from 'axios';
import { API_URL } from '../constants/index';

export default function DeleteForm(props) {
    
    const recipe = props.recipe;

    const [isOpen, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteRecipe = () => {
        axios.delete(API_URL + "recipes/" + recipe.pk).then( () => {
            handleClose();
        })
    };

    const actions = [
        <Button onClick={deleteRecipe}>Delete</Button>,
        <Button onClick={handleClose}>Cancel</Button>
    ];

    return (
        <React.Fragment>
            <Button color='primary' onClick={handleOpen}>Delete</Button>
            <ModalWindow isOpen={isOpen} handleClose={handleClose} modalTitle={'Delete "' + recipe.name + '"'} actions={actions}>
                <p>Are you sure you want to delete this recipe?</p>
            </ModalWindow>
        </React.Fragment>

    )
}