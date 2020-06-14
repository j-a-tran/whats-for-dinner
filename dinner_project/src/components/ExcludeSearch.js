import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class ExcludeSearch extends Component {
    render() {

        const ingredients = this.props.ingredients;

        return (

            <Autocomplete 
                onChange ={this.props.getExcludeParams}
                fullWidth
                filterSelectedOptions = {true}
                multiple
                id='exclude-search'
                name='exclude-search'
                options={ingredients}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="I don't have..."
                      placeholder="Select ingredients"
                    />
                )}
            />
        );
    }
}

export default ExcludeSearch;