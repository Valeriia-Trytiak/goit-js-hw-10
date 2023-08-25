// const params = new URLSearchParams {

// }
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.headers.common['x-api-key'] =
  'live_ A3ZSRujL9i0dmt1zQPz6xhOQWX9GuL do6JWDcBab6VSCSuKeM20Dut29LtXj fc01';

function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
      Notify.failure(`${error.message}`);
    });
}

export { fetchBreeds };
