import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxilary from '../../../hoc/Auxilary/Auxilary';

const sideDrawer = (props) => {
    let assignedclasses = [classes.SideDrawer , classes.Close]
    if(props.show) {
        assignedclasses = [classes.SideDrawer , classes.Open]
    }
    return (
        <Auxilary>
        <Backdrop show={props.show} clicked={props.cancel} />
        <div className={assignedclasses.join(' ')}>
        <div className={classes.Logo}>
            <Logo />
        </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Auxilary>
    )
}

export default sideDrawer;