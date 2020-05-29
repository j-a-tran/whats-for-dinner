import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ModalWindow(props) {

    return (
      <React.Fragment>
        <Dialog open={props.isOpen} onClose={props.handleClose}>
          <DialogTitle id="dialog-title">{props.modalTitle}</DialogTitle>
          <DialogContent>
            {props.children}
          </DialogContent>
          <DialogActions>
            {props.actions}
          </DialogActions>
        </Dialog>
      </React.Fragment>

    );

}