import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.baseURL = 'https://api.thecatapi.com';
axios.defaults.headers.common['x-api-key'] =
  'live_A3ZSRujL9i0dmt1zQPz6xhOQWX9GuLdo6JWDcBab6VSCSuKeM20Dut29LtXjfc01';

function fetchBreeds() {
  return axios
    .get('/v1/breeds')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
      Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
      Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    });
}

export { fetchBreeds, fetchCatByBreed };
