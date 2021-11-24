import ApiService from './js-api-service.js';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import cardList from '../../src/card-list.hbs';
import '../css/styles.css';

const JsApiService = new ApiService();
let count = 0;

const refs = {
  searchForm: document.querySelector('#search-form'),
  logList: document.querySelector('.log-list'),
  LoadMoreBtn: document.querySelector('.load-more'),
};

refs.logList.addEventListener('click', onClickFoto);
refs.searchForm.addEventListener('submit', userRequest);
refs.LoadMoreBtn.addEventListener('click', onLoadMoreBtn);

function userRequest(event) {
  event.preventDefault();

  JsApiService.query = event.target.elements.searchQuery.value.trim();
  JsApiService.resetPage();
  refs.logList.innerHTML = '';

  if (JsApiService.query === '') {
    refs.LoadMoreBtn.classList.add('is-hidden');
    refs.logList.innerHTML = '';
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    return;
  }

  JsApiService.fetchImg(JsApiService.query)
    .then(showImage)
    .catch(error => {
      refs.LoadMoreBtn.classList.add('is-hidden');
      refs.logList.innerHTML = '';
      Notiflix.Notify.failure(
        `Sorry, there are no images matching your search query. Please try again`,
      );
    });
}

function showImage(data) {
  const markup = cardList(data);
  refs.logList.insertAdjacentHTML('beforeend', markup);

  refs.LoadMoreBtn.classList.remove('is-hidden');
  const lightbox = new SimpleLightbox('.photo-card a');
  scrollImage();

  if (data.hits.length < 40) {
    refs.LoadMoreBtn.classList.add('is-hidden');
    Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
  }

  if (data.hits.length < 1) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    return;
  }
}

function onLoadMoreBtn(event) {
  if (event) {
    JsApiService.pageAdd();
    JsApiService.fetchImg().then(showImage);
    const lightbox = new SimpleLightbox('.photo-card a');
    lightbox.refresh();
  }
}

function onClickFoto(event) {
  event.preventDefault();
  const isImage = event.target.classList.contains('photo-card_img');
  if (!isImage) {
    return;
  }
}

function scrollImage() {
  const { height: cardHeight } = refs.logList.firstElementChild.getBoundingClientRect();
  if (count !== 0)
    window.scrollBy({
      top: cardHeight * 1.5,
      behavior: 'smooth',
    });
  count += 1;
}
