import axios from 'axios';

const instance = axios.create({
            baseURL: 'https://react-my-burger-99ccc.firebaseio.com/'
})
    
export default instance;