import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const items = [
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type : 'cheese'},
    {label: 'Bacon', type: 'bacon'}
];

const buildControls = (props) => (
    <div className = {classes.BuildControls}>
    <p> Current Price : {props.currentprice.toFixed(2)} </p>
    {items.map(cntr => (<BuildControl 
                    key= {cntr.label} 
                    label={cntr.label} 
                    added={()=> props.added(cntr.type)}
                    remove={()=> props.remove(cntr.type) }
                    disabled={props.disabled[cntr.type]}/>) )}
        
            <button className= {classes.OrderButton} disabled={!props.purchasable} 
                onClick={props.show}> ORDER NOW </button>
        </div>
)
export default buildControls;