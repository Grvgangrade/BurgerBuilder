import React from 'react';
import classes from './Logo.css';
import burgerlogo from '../../Assets/Images/burger-logo.png';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerlogo} alt='MyBurger' />
    </div>
)

export default logo;