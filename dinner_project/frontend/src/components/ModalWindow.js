import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import RecipeForm from './RecipeForm';

export default function ModalWindow(props) {

    return (
      <React.Fragment>
        <Dialog open={props.isOpen}>
          <DialogTitle id="dialog-title">{props.modalTitle}</DialogTitle>
          <DialogContent>
            {props.children}
          </DialogContent>
          <DialogActions>
            {props.actionButton}
            <Button onClick={ () => props.handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

    );

}