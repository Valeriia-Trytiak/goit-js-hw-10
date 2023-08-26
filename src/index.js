import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const refs = {
  breedList: document.querySelector('.breed-select'),
};

refs.breedList.addEventListener('change', onChangeBreedList);

fetchBreeds()
  .then(data => {
    createOption(data);
    refs.breedList.insertAdjacentHTML('beforeend', createOption(data));
  })
  .catch(error => {
    console.log(error);
    Notify.failure(`${error.message}`);
  });

function createOption(arr) {
  return arr
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>;`;
    })
    .join('');
}

function onChangeBreedList(evt) {
  console.log(evt.target.value);
  fetchCatByBreed(evt.target.value).then(value => {});
}
