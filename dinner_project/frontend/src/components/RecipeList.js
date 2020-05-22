import React, { Component } from 'react';
import NewRecipeModal from './NewRecipeModal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class RecipeList extends Component {
    render() {
      const recipes = this.props.recipes;
      return (
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Ingredients</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!recipes || recipes.length <= 0 ? (
              <TableRow>
                <TableCell>No recipes added.</TableCell>
              </TableRow>
            ) : (
              recipes.map(recipe => (
                <TableRow key={recipe.pk}>
                    <TableCell>{recipe.name}</TableCell>
                    <TableCell>{recipe.desc}</TableCell>
                    <TableCell>{recipe.ingredients}</TableCell>

                  {/*
                  <TableCell>
                    <NewRecipeModal
                      create={false}
                      recipe={recipe}
                      resetState={this.props.resetState}
                    />
                  </TableCell>
                  */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        </TableContainer>
      );
    }
  }
  
  export default RecipeList;