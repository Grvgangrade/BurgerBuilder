import React, { Component } from 'react';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/BuildControls/OrderSummary';
import axios from '../../hoc/axiosorders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/errorhandler/errorhandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../stores/actions/actionTypes';



class BurgerBuilder extends Component{
    state = {
            purchasing:false,
            loading:false,
            error:null
        }

    updatePurchasableIngredient=(ingredient)=>{
        const sum = Object.keys(ingredient)
        .map((igkey) => {return ingredient[igkey]} ).reduce((sum,el) => {return sum +el} ,0)
        return sum>0
    };
    
    addIngredientHandler = (type) => {
      
    }
    
    removeIngredientHandler = (type) => {

    }
    
    updatePurchasingHandler =()=>{
        this.setState({purchasing:true});
    };

    cancelPurchaseHandler=()=>{
        this.setState({purchasing:false});
    };
    
    continuePurchaseHandler = ()=>{
        
        const queryparams = [];
        for(let i in this.state.ingredient){
            queryparams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredient[i]))
        }
        queryparams.push('price=' + this.state.totalPrice );
        
        const querystring= queryparams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search:'?' + querystring});
                console.log(querystring);
                console.log(this.props);
    }

   /* componentDidMount(){
        axios.get('https://react-my-burger-99ccc.firebaseio.com.json').then(response=> {
        this.setState({ingredient:response.data})}).catch(error => {this.setState({error:true})});
        } */
    
    render(){
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
            
        if(this.state.loading){
            orderSummary= <Spinner />
        }
            
        let burger = (this.state.error ? <p> Ingredient cannot be loaded </p> : <Spinner />)
            if(this.props.ings) {
                burger =(<Auxilary>
                        <Burger ingredients={this.props.ings} />
                      
                        <BuildControls added={this.props.onIngredientAdded} 
                            remove={this.props.onIngredientRemoved} 
                            currentprice={this.props.price} 
                            purchasable={this.updatePurchasableIngredient(this.props.ings)} 
                            show={this.updatePurchasingHandler}
                            disabled={disabledInfo}/>
                  </Auxilary>);
                 orderSummary =(<OrderSummary 
                                ingredients={this.props.ings} 
                                cancel={this.cancelPurchaseHandler} 
                                continuehandler={this.continuePurchaseHandler} 
                                price={this.props.price}> 
                            </OrderSummary>)
            }
                         
            if(this.state.loading){
            orderSummary= <Spinner />
        }
            
                   
        return(
            <Auxilary>
                {burger}
                <Modal show={this.state.purchasing} 
                       cancelbackdrop={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
            </Auxilary>
        );
}}
                      
const mapStatetoProps = state => {
    return {
                ings: state.ingredient,
                price: state.totalPrice,
                purchasable: state.purchasable
           }
};
                      
const mapDispatchtoProps = dispatch => {
    return {
                onIngredientAdded: (ingname)=>{dispatch({type:actionTypes.ADD_INGREDIENT , ingredientName: ingname})},
                onIngredientRemoved: (ingname)=>{dispatch({type:actionTypes.REMOVE_INGREDIENT , ingredientName: ingname})}
            }
};

export default connect(mapStatetoProps,mapDispatchtoProps)(withErrorHandler(BurgerBuilder , axios));