import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedingredient = Object.keys(props.ingredients).map(igKey => {
                                return ( [...Array(props.ingredients[igKey])].map((_,i) =>
                                { return <BurgerIngredient key={igKey + i} type={igKey} /> }
                                    )
                                    )}).reduce((arr,el) => {
                                    return arr.concat(el);
                                },[])
    if(transformedingredient.length === 0){
               transformedingredient = <p> Please start adding ingredient </p>
                                }
    return (
        <div className= {classes.Burger}>
            <BurgerIngredient type="bread-top" />     
            {transformedingredient}
            <BurgerIngredient type="bread-bottom" />     
        </div> )
    
};

export default burger;