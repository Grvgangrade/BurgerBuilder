import React from 'react';
import Burger from '../../../Burger/Burger';
import Button from '../../../Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) =>{
    return(
        <div className={classes.CheckoutSummary}>
            <h1> We hopes your burger will be delicious </h1>
            <Burger ingredients={props.ingredient} />
            <Button buttontype='Danger' clicked={props.checkoutCancelled}> CANCEL </Button>
            <Button buttontype='Success' clicked={props.checkoutContinued}> CONTINUE </Button>
        </div>
    );
    
}

export default checkoutSummary;