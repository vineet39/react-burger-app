import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-burger-app-13b4a.firebaseio.com'
});

export default instance;