import axios from 'axios';

export default axios.create({
  baseURL: 'https://blackfoot-language-app.herokuapp.com',
  headers: {
    'Content-type': 'application/json',
  },
});
