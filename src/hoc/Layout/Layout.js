import React , {Component} from 'react';
import Auxilary from '../Auxilary/Auxilary';
import classes from './Layout.css';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showsidedrawer: false
    }

showSideDrawer = () => {
    this.setState({showsidedrawer:true})
};

cancelSideDrawer = () => {
    this.setState((prevstate) => {
        return {showsidedrawer:!prevstate.showsidedrawer }
        }) 
}


    render(){
    return(
        <div className={classes.Content}>
            <Auxilary>
        <Toolbar show={this.showSideDrawer} />
        <SideDrawer show={this.state.showsidedrawer} clicked={this.showSideDrawer} cancel={this.cancelSideDrawer}/>
        <main>
                {this.props.children}
            </main>
            </Auxilary>
        </div>
    )
}
}

export default Layout;