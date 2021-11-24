import './sass/main.scss';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import cardList from '../src/partials/js/card-list.hbs';
const AUTH_TOKEN = '24470398-c309df70e691fcddcf65d58a2';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const refs = {
  searchForm: document.querySelector('#search-form'),
  logList: document.querySelector('.log-list'),
};

function handleSubmit(event) {
  event.preventDefault();

  const userRequest = event.target.elements.searchQuery.value.trim();
  console.log(userRequest);

  const fetchImg = () => {
    return axios.get(
      `?key=${AUTH_TOKEN}&q=${userRequest}&image_type=photo&orientation=horizontal&safesearch=true`,
    );
  };

  fetchImg()
    .then(response => renderCard)
    // .then(response => console.log(response.data.hits.length))
    .catch(
      error => {
        console.log('MAYBE ERROR?');
        // if ((response.data.hits.length = 0)) {
        //   Notify.Notify.info(
        //     'Sorry, there are no images matching your search query. Please try again.',
        //   );
        // }
      },
      // Notify.Notify.info(
      //   'Sorry, there are no images matching your search query. Please try again.',
      // ),
    );

  // if ((response.data.hits.length = 0)) {
  //   Notify.Notify.info('Sorry, there are no images matching your search query. Please try again.');
  // }
}

// function renderCard({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
//   const markup = `<div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>${likes}
//     </p>
//     <p class="info-item">
//       <b>Views</b>${views}
//     </p>
//     <p class="info-item">
//       <b>Comments</b>${comments}
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>${downloads}
//     </p>
//   </div>
// </div>`;
//   refs.logList.innerHTML = markup;
// }

refs.searchForm.addEventListener('submit', handleSubmit);
//=============
function renderCard(params) {
  const markupCountry = cardList(params);
  refs.logList.innerHTML = markupCountry;
  console.log(params);
}
