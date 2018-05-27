import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-a0de2.firebaseio.com'
})

export default instance;
