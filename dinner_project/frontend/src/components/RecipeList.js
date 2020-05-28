import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';
import Chip from '@material-ui/core/Chip';
import ModalWindow from './ModalWindow';

class RecipeList extends Component {

  render() {
    const recipes = this.props.recipes;
    const ingredients = this.props.ingredients;

    return (
      <GridList cellHeight={180} cols={3}>
          {!recipes || recipes.length <= 0 ? (
              <Typography>No recipes added.</Typography>
          ) : (
            recipes.map(recipe => (
              <GridListTile component="Card" cols={1} spacing={10}>
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
                    <ModalWindow recipe={recipe} ingredients={ingredients} />
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