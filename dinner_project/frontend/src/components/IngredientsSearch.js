import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class IngredientsSearch extends Component {
    render() {

        const ingredients = this.props.ingredients;

        return (

            <Autocomplete 
                multiple
                id="ingredients-search"
                options={ingredients}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Ingredients"
                      placeholder="Select ingredients"
                    />
                )}
            />
        );
    }
}

export default IngredientsSearch;