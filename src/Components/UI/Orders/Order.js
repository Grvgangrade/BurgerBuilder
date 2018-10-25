import React from 'react';
import classes from './Order.css';

const order = (props) => {
    let ingredient = [];
    for (let ingredientsname in props.ingredient){
        ingredient.push({
            name: ingredientsname,
            amount: props.ingredient[ingredientsname]
        })
    }    
    const ingredientOutput = ingredient.map(ig=> {
        return (
            <span style={{
                textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
            }}
            key={ig.name}> {ig.name}({ig.amount})</span>
        )
    })
    
    return(
        <div className={classes.Order} >
            <p> Ingredients : {ingredientOutput} </p>
            <p> Price = <strong> USD {props.price} </strong> </p>
        </div>
    )
}

export default order;