import React from 'react';
import classes from './Drawertoggle.css';

const drawerToggle = (props) => {
    return(
    <div className= {classes.DrawerToggle} onClick={props.show}>
        <div></div>
        <div></div>
        <div></div>
    </div>
        )
} 

export default drawerToggle;