import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class IngredientsSearch extends Component {
    render() {

        const ingredients = this.props.ingredients;

        return (

            <Autocomplete 
                onChange ={this.props.getSearchParams}
                filterSelectedOptions={true}
                fullWidth
                multiple
                id="ingredients-search"
                options={ingredients}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="I'm in the mood for any of..."
                      placeholder="Select ingredients"
                    />
                )}
            />
        );
    }
}

export default IngredientsSearch;