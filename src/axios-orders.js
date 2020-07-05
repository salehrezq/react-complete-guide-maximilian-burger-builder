import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://react-burger-builder-4a4fd.firebaseio.com/'
});

export default instance;
