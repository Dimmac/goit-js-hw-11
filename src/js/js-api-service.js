import axios from 'axios';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';
const AUTH_TOKEN = '24470398-c309df70e691fcddcf65d58a2';

export default class ApiService {
  constructor() {
    this.pageNumber = 1;
    this.userData = '';
    this.URL = 'https://pixabay.com/api/';
  }

  fetchImg() {
    return axios
      .get(
        `${this.URL}?key=${AUTH_TOKEN}&q=${this.userData}&page=${this.pageNumber}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`,
      )
      .then(response => {
        if (this.pageNumber === 1 && response.data.totalHits > 1) {
          Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
        }

        return response.data;
      });
  }

  pageAdd() {
    this.pageNumber += 1;
  }

  resetPage() {
    this.pageNumber = 1;
  }

  get query() {
    return this.userData;
  }

  set query(newRequest) {
    this.userData = newRequest;
  }
}
