import { fetchBreeds } from './cat-api.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  breedList: document.querySelector('.breed-select'),
};
// console.log(refs.breedList);

// function markupList() {}

console.log(fetchBreeds());
