import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ModalWindow from './ModalWindow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import axios from 'axios';
import { API_URL } from '../constants/index';

class RecipeForm extends React.Component {
    
    state = {
        pk: 0,
        name: '',
        desc: '',
        ingredients: [],
        isOpen: false
    };

    handleOpen () {
        this.setState({isOpen: true});
    }

    handleClose () {
        this.setState({isOpen: false});
    }

    componentDidMount () {
        if (this.props.recipe) {
            const { pk, name, desc, ingredients } = this.props.recipe;
            this.setState({
                pk,
                name,
                desc,
                ingredients
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });

    };

    onIngredientsChange = (event, value) => {

        const formattedIngredients = value.map( item => {
            const object = {};
            object.name = item;

            return object;
        })

        this.setState({ 
            ingredients: formattedIngredients
        });

        console.log(value);
        console.log(this.state)
 
    };

    createRecipe = e => {
        e.preventDefault();

        const payload = {
            pk: this.state.pk,
            name: this.state.name,
            desc: this.state.desc,
            ingredients: this.state.ingredients
        }

        axios.post(API_URL.concat("recipes/"), payload
        ).then(() => {
            console.log(this.state);
            this.handleClose();
        })
    };

    render () {

        const actionButton = <Button type="submit" form="recipeForm">Save</Button>;

        return (
            <React.Fragment>
                <Fab color='primary' onClick={ () => this.handleOpen() }>
                    <AddIcon />
                </Fab>
                <ModalWindow isOpen={this.state.isOpen} modalTitle="Create Recipe" actionButton={actionButton}>
                    <form noValidate autoComplete='off' onSubmit={this.createRecipe} id="recipeForm">
                        <TextField required name="name" label="Name" onChange={this.onChange} />
                        <TextField name="desc" label="Description" onChange={this.onChange} />

                        <Autocomplete 
                            multiple
                            id="ingredients"
                            options={this.props.ingredients.map((option) => option.name)}
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                variant="standard"
                                label="Ingredients"
                                placeholder="Select ingredients"
                                />
                            )}
                            onChange={this.onIngredientsChange}
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

}

export default RecipeForm;