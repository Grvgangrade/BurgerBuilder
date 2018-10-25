import React, { Component } from 'react';
import Order from '../../Components/UI/Orders/Order';
import axios from '../../hoc/axiosorders';
import errorhandler from '../../hoc/errorhandler/errorhandler';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        loading:true,
        orders:[]
    }

componentDidMount(){
    axios.get('orders.json').then(res=> {
            const fetchedOrders = [];
            for(let key in res.data){
            fetchedOrders.push({
                ...res.data[key],
                id:key
            })        
            }
        this.setState({loading:false , orders:fetchedOrders})
    }).catch(error=>{
            this.setState({loading:false})});
    
}

    render(){
        let showOrder = null;
        if (this.state.loading){
            showOrder = <Spinner />
        }else {
            showOrder = (this.state.orders.map(orders=>
                   <Order  ingredient = {orders.ingredients} 
                            price = {orders.price} 
                            key= {orders.id} />           
            ))
        }
        return(
            <div>
                {showOrder}
            </div>
        )
    }
}

export default errorhandler( Orders , axios );