import React , { Component } from 'react';
import Button from '../../Components/Button/Button';
import classes from './ContactData.css';    
import axios from '../../hoc/axiosorders';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Input from '../../Components/UI/Input/Input';
import { connect } from 'react-redux';

class ContactData extends Component {
    state = {
        orderForm :{
            name:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            } ,
            street: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Your Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            } ,
            country: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Your Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            } ,
            email: {
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder:'Your E-Mail'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            } ,
            pincode:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Your ZIP'
                },
                value:'',
                validation:{
                    required:true,
                    minLength: 5,
                    maxLength:5
                },
                valid:false,
                touched:false
            } ,
            deliverymethod: {
                elementType: 'select',
                elementConfig:{
                    options:[
                        {value: 'fastest' , displayValue: 'Fastest'},
                        {value: 'cheapest' , displayValue: 'Cheapest'}
                    ]
                },
                value:'',
                valid:true
            }
        },
        formIsValid:false,
        loading: false
    }
    
orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading:true});
    const formOrder = {};
    for ( let elementIdentifier in this.state.orderForm) {
        formOrder[elementIdentifier] = this.state.orderForm[elementIdentifier].value;
    }
        const orders = {
            ingredients: this.props.ings,
            price: this.props.price.toFixed(2),
            orderData: formOrder
            
        }
    
        axios.post('/orders.json' , orders).then(response=> {
                                this.setState({loading:false});
                                this.props.history.push('/');
        } )
                                .catch(error=> this.setState({loading:false }));      
}

validationHandler= (value , rules) => {
    let isValid = true
    
    if(rules){
         if(rules.required){
        isValid = value.trim() !== '' && isValid
    }
    
    if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid
    }
    
    if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }
    }
    return isValid
}

changedDetailHandler = (event , elementIdentifier) =>{
    const updatedDetails = {...this.state.orderForm}
    let updatedDetailsOrder = {...updatedDetails[elementIdentifier]}
    updatedDetailsOrder.value = event.target.value
    updatedDetailsOrder.valid = this.validationHandler(updatedDetailsOrder.value , updatedDetailsOrder.validation )
    updatedDetailsOrder.touched = true
    let formIsValid = true
    for(let elementIdentifier in updatedDetails){
        formIsValid = updatedDetails[elementIdentifier].valid && formIsValid
    }
    
    console.log(formIsValid);
    console.log(updatedDetailsOrder)
    
    updatedDetails[elementIdentifier] = updatedDetailsOrder
    this.setState({orderForm:updatedDetails, formIsValid:formIsValid});
}

    render(){
       const formDetails = []
        for ( let key in this.state.orderForm){
            formDetails.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }
        
        
        let form = (<form onSubmit={this.orderHandler}>
                    {formDetails.map(formElement=>(
                        <Input  
                                key={formElement.id}
                                elementType={formElement.config.elementType} 
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value} 
                                clicked={(event) => this.changedDetailHandler(event , formElement.id ) }
                                Invalid={!formElement.config.valid}
                                isValidation={formElement.config.validation}
                                touched={formElement.config.touched}/>
                   ))}
                    <Button buttontype='Success' disabled={!this.state.formIsValid}
                            clicked={this.orderHandler}> 
                        Order 
                    </Button>
                </form> 
                    );
        if(this.state.loading){
            form = <Spinner />
        }
            
        return(
            <div className={classes.ContactData} >
                <h4> Can we have your contact details </h4>
                {form}
            </div>
        )
        }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredient,
        price:state.totalPrice
    }
};

export default connect(mapStateToProps)(ContactData);