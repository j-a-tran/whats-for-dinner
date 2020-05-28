import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import axios from 'axios';
import { API_URL } from '../constants/index';

class RecipeForm extends React.Component {
    
    state = {
        pk: 0,
        name: '',
        desc: '',
        ingredients: []
    };

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

        axios.post(API_URL.concat("recipes/"),this.state
        ).then(() => {
            console.log(this.state)
            //something needs to go here for closing the form
        })
    };

    render () {

        return (
            <form noValidate autoComplete='off' onSubmit={this.createRecipe}>
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

                <Button type="submit">Save</Button>
            </form>

        )

    }

}

export default RecipeForm;