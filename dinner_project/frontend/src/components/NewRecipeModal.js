import React, { Component, Fragment } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import NewRecipeForm from './NewRecipeForm';
import Typography from '@material-ui/core/Typography';

class NewRecipeModal extends Component {
    state = {
        modal: false
    };
    
    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    };

    render() {
        const create = this.props.create;

        var title = 'Edit';
        var button = <Button onClick={this.toggle}>Edit</Button>;
        if (create) {
            title = 'Create';

            button = <Button onClick={this.toggle}>Create</Button>;
        }

        return(
            <Fragment>
                {button}
                <Modal open={this.state.modal} toggle={this.toggle}>
                    <Typography toggle={this.toggle}>{title}</Typography>
                    <NewRecipeForm
                        resetState={this.props.resetState}
                        toggle={this.toggle}
                        recipe={this.props.recipe}
                    />
                </Modal>
            </Fragment>

        );
    }
}

export default NewRecipeModal;