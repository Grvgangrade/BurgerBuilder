import React, { Component }  from 'react';
import Auxilary from '../Auxilary/Auxilary';
import Modal from '../../Components/UI/Modal/Modal';
import axios from '../axiosorders';

const withErrorHandler = (WrappedComponent) => {
return class extends Component {
    state = {
        error: null
    }
    
    componentWillMount() {
        this.resInterceptors = axios.interceptors.response.use(res => res , error=> {
            this.setState({error:error})
        });
        
        this.reqInterceptors = axios.interceptors.request.use(req=> {
            this.setState({error:null})
            return req;
        });
    }
    
    componentWillUnmount() {
        axios.interceptors.response.eject(this.resInterceptors);
        axios.interceptors.request.eject(this.reqInterceptors);

    }
    
    cancelBackdropHandler = () => {
        this.setState({error:null});
    }
    
    render(){
        return(
        <Auxilary>
            <Modal show={this.state.error} cancelbackdrop= {this.cancelBackdropHandler}>
               { this.state.error ? this.state.error.message : null }
            </Modal>
            <WrappedComponent {...this.props} />
        </Auxilary>
            )
    }   
}
}

export default withErrorHandler;
