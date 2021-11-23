import './sass/main.scss';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const AUTH_TOKEN = '24470398-c309df70e691fcddcf65d58a2';

axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const fetchImg = () => {
  // return axios.get(`?q=yellow+flowers&image_type=photo`).then(response => console.log(response));
  return axios
    .get(`?key=${AUTH_TOKEN}&q=yellow+flowers&image_type=photo`)
    .then(response => console.log(response.data.hits[0].previewURL));
};
fetchImg();
// console.log(axios.baseURL);
//${axios.defaults.baseURL}
