import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';
import Chip from '@material-ui/core/Chip';
import DeleteForm from './DeleteForm';
import EditForm from './EditForm';

class RecipeList extends Component {

  render() {
    const recipes = this.props.recipes;
    const ingredients = this.props.ingredients;

    return (
      <GridList cols={3}>
          {!recipes || recipes.length <= 0 ? (
              <Typography>No recipes added.</Typography>
          ) : (
            recipes.map(recipe => (
              <GridListTile component="Card" key={recipe.pk} spacing={10}>
                <Card key={recipe.pk} variant="outlined">
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">{recipe.name}</Typography>
                      <Typography variant="body2" color="textSecondary" component="p">{recipe.desc}</Typography>
                      {recipe.ingredients.map(ingredient => (
                        <Chip label={ingredient.name} size="small" />
                      ))}

                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <EditForm recipe={recipe} ingredients={ingredients} resetState={this.props.resetState}/>
                    <DeleteForm recipe={recipe} resetState={this.props.resetState}/>
                  </CardActions>
                </Card>
              </GridListTile>
            ))
          )}
      </GridList>
    );
  }

}
  
  export default RecipeList;