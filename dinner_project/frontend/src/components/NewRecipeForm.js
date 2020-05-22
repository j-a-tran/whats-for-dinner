import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


import axios from 'axios';

import { API_URL } from '../constants';

class NewRecipeForm extends React.Component {
    state = {
        pk: 0,
        name: '',
        desc: '',
        ingredients: ''
    };

    componentDidMount() {
        if (this.props.recipe) {
            const { pk, name, desc, ingredients } = this.props.recipe;
            this.setState({
                pk,
                name,
                desc,
                ingredients
            })
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    createRecipe = e => {
        e.preventDefault();
        axios.post(API_URL, this.state).then( () => {
            this.props.resetState();
            this.props.toggle();
        });
    };

    editRecipe = e => {
        e.preventDefault();
        axios.put(API_URL + this.state.pk, this.state).then( () => {
            this.props.resetState();
            this.props.toggle();
        });
    };

    defaultIfEmpty = value => {
        return value === '' ? '' : value;
    };

    render() {
        return (
            <div>
            <form onSubmit={this.props.recipe ? this.editRecipe : this.createRecipe}>
                <TextField id="recipe-name" label="Standard" onChange={this.onChange} value ={this.defaultIfEmpty(this.state.name)} />
                <TextField id="recipe-desc" label="Standard" onChange={this.onChange} value={this.defaultIfEmpty(this.state.desc)} />
                <Autocomplete
                    multiple
                    id="ingredients"
                    options={ingredientOptions}
                    getOptionLabel={(option) => option.name}
                    defaultValue=''
                    renderInput={(params) => (
                        <TextField 
                            {...params}
                            variant='standard'
                            label='Ingredients'
                            placeholder='Add ingredients'
                        />
                    )}
                />

            </form>
            <Button>Save</Button>
            </div>
        );
    }
}

const ingredientOptions = [
    { name: 'Water' },
    { name: 'Pepper' },
    { name: 'Onion' },
    { name:  'Ma Po tofu' },
]
export default NewRecipeForm;