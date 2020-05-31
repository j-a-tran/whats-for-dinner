import React from 'react';

import DeleteForm from './DeleteForm';
import EditForm from './EditForm';
import NewForm from './NewForm';

export default function ModalConductor(props) {
    
    switch(props.currentModal) {
        case 'new':
            return  (<NewForm isOpen={props.isOpen} handleClose={props.handleClose} ingredients={props.ingredients} resetState={props.resetState}/>);
        case 'edit':
            return (<EditForm isOpen={props.isOpen} handleClose={props.handleClose} recipe={props.recipe} ingredients={props.ingredients} resetState={props.resetState}/>);
        case 'delete':
            return (<DeleteForm isOpen={props.isOpen} handleClose={props.handleClose} recipe={props.recipe} resetState={props.resetState}/>);
        default:
            return null; 
    };
}
