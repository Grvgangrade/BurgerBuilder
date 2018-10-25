import React from 'react';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import Button from '../Button/Button';

const orderSummary =(props)=> {
    const ingredients = Object.keys(props.ingredients).map(igkey => {
        return ( 
            <li key={igkey}> {igkey} : {props.ingredients[igkey]}</li>)})
    return (
        <Auxilary>
            <h3> Your delicious burger has following ingredients : </h3>
            <ul> {ingredients} </ul>
            <p><strong> Total Price : {props.price.toFixed(2)} </strong> </p>
            <p> Proceed to checkout ?</p>
            <Button buttontype='Success' clicked={props.continuehandler}> CONTINUE </Button>
            <Button buttontype='Danger' clicked={props.cancel}> CANCEL </Button>
        </Auxilary>
    )
}
 
export default orderSummary;