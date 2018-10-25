import React , { Component } from 'react';
import CheckoutSummary from '../../Components/UI/Orders/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../ContactData/ContactData';
import { connect} from 'react-redux';

class Checkout extends Component {

/*componentWillMount(){
    const query = new URLSearchParams(this.props.location.search);
    
    const ingredients = {};
    let price = 0;
    for(let param of query.entries()){
        if(param[0]==='price'){
            price = +param[1];
        }else {
            ingredients[param[0]] = +param[1];
        }
    }
    this.setState({ingredient: ingredients, price:price})
    console.log(this.props);
    
}*/

checkoutCancelled = ()=> {
    this.props.history.goBack();
}

checkoutContinued= () =>{
    
    this.props.history.replace('/checkout/contact-data');
}
    render(){
        return(
            <div>
            <CheckoutSummary ingredient={this.props.ings} checkoutCancelled={this.checkoutCancelled}
            checkoutContinued={this.checkoutContinued} />
            <Route path={this.props.match.path + '/contact-data'} 
            component={ContactData} />} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredient
    }
};

export default connect(mapStateToProps)(Checkout);