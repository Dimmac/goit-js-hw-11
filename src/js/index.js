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

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.log-list');
const LoadMoreBtn = document.querySelector('.load-more');

galleryEl.addEventListener('click', onClickJustImage);
formEl.addEventListener('submit', searchImg);
LoadMoreBtn.addEventListener('click', onLoadMoreBtn);

function searchImg(e) {
  e.preventDefault();

  JsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  JsApiService.resetPage();
  galleryEl.innerHTML = '';

  if (JsApiService.query === '') {
    LoadMoreBtn.classList.add('is-hidden');
    galleryEl.innerHTML = '';
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    return;
  }

  JsApiService.fetchImg(JsApiService.query)
    .then(showImg)
    .catch(error => {
      LoadMoreBtn.classList.add('is-hidden');
      galleryEl.innerHTML = '';
      Notiflix.Notify.failure(
        `Sorry, there are no images matching your search query. Please try again`,
      );
    });
}

function showImg(data) {
  const markup = cardList(data);
  galleryEl.insertAdjacentHTML('beforeend', markup);

  LoadMoreBtn.classList.remove('is-hidden');
  const lightbox = new SimpleLightbox('.photo-card a');
  scrollImg();

  if (data.hits.length < 40) {
    LoadMoreBtn.classList.add('is-hidden');
    Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
  }

  if (data.hits.length < 1) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );

    return;
  }
}

function scrollImg() {
  const { height: cardHeight } = galleryEl.firstElementChild.getBoundingClientRect();
  if (count !== 0)
    window.scrollBy({
      top: cardHeight * 1.5,
      behavior: 'smooth',
    });
  count += 1;
}

function onClickJustImage(e) {
  e.preventDefault();
  const isImage = e.target.classList.contains('photo-card_img');
  if (!isImage) {
    return;
  }
}

function onLoadMoreBtn(e) {
  if (e) {
    JsApiService.pageAdd();
    JsApiService.fetchImg().then(showImg);
    const lightbox = new SimpleLightbox('.photo-card a');
    lightbox.refresh();
  }
}
