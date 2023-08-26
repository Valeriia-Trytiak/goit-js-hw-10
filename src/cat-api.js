import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.baseURL = 'https://api.thecatapi.com';
axios.defaults.headers.common['x-api-key'] =
  'live_ A3ZSRujL9i0dmt1zQPz6xhOQWX9GuL do6JWDcBab6VSCSuKeM20Dut29LtXj fc01';

function fetchBreeds() {
  return axios
    .get('/v1/breeds')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
      Notify.failure(`${error.message}`);
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(error => {
      console.log(error);
      Notify.failure(`${error.message}`);
    });
}

export { fetchBreeds, fetchCatByBreed };
