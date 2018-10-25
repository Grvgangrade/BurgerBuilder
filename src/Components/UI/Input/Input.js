import React from 'react';
import classes from './Input.css';


const input = (props) => {
    let inputElement = null
    let inputclasses = [classes.InputElement]
    
    if (props.Invalid && props.isValidation && props.touched){
        inputclasses.push(classes.Invalid) 
    }
    switch(props.elementType){
        case ('input') :
            inputElement = <input className={inputclasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.clicked}/>
            break;
        
        case ('textarea') :
            inputElement = <textarea className={inputclasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.clicked}/>
            break;
            
        case ('select') :
            inputElement = (<select className={inputclasses.join(' ')}
                                    value={props.value}
                                onChange={props.clicked}>
                                {props.elementConfig.options.map(
                                option => (
                                <option value={option.value} 
                                        key={option.value}>
                                    {option.displayValue}
                                </option>
                                ))}
                         </select>)
            break;    
            
        default:
            inputElement = <input className={inputclasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} 
        onChange={props.clicked}/>
            break;
    }
    
    return(
        <div className={classes.Input}>
            <label className={classes.Label}> {props.label} </label>
            {inputElement}
        </div>
    )
}

export default input;