import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalWindow(props) {

    //Declares an 'open' variable, set to FALSE, where setOpen is the method that updates it. useState declares a state variable
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () =>  {
      setOpen(false);  
    };

    return (
      <div>
        <Button onClick={handleClickOpen}>Open Modal</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="dialog-title">{props.recipeName}</DialogTitle>
          <DialogContent>
            <DialogContentText>
                I am a modal.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleClose}>Also Close</Button>
          </DialogActions>
        </Dialog>
      </div>

    );

}