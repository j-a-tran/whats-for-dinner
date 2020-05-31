import React from 'react';
import Button from '@material-ui/core/Button';
import ModalWindow from './ModalWindow';

import axios from 'axios';
import { API_URL } from '../constants/index';

export default function DeleteForm(props) {
    
    const recipe = props.recipe;

    const deleteRecipe = () => {
        axios.delete(API_URL + "recipes/" + recipe.pk).then( () => {
            props.resetState();
            props.handleClose();
        })
    };

    const actions = [
        <Button onClick={deleteRecipe}>Delete</Button>,
        <Button onClick={props.handleClose}>Cancel</Button>
    ];

    return (
        <React.Fragment>
            <ModalWindow isOpen={props.isOpen} handleClose={props.handleClose} modalTitle={'Delete "' + recipe.name + '"'} actions={actions}>
                <p>Are you sure you want to delete this recipe?</p>
            </ModalWindow>
        </React.Fragment>

    )
}