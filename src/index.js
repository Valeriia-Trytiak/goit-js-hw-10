import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

import SlimSelect from 'slim-select';

const refs = {
  breedList: document.querySelector('.breed-select'),
  container: document.querySelector('.cat-info'),
};

refs.breedList.addEventListener('change', onChangeBreedList);

fetchBreeds()
  .then(data => {
    createOption(data);
    refs.breedList.insertAdjacentHTML('beforeend', createOption(data));

    new SlimSelect({
      select: refs.breedList,
      settings: {
        placeholderText: 'Please, select a cat breed',
      },
    });
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
  fetchCatByBreed(evt.target.value)
    .then(data => {
      console.dir(data);
      createCarts(data);
      refs.container.insertAdjacentHTML('beforeend', createCarts(data));
    })
    .catch(error => {
      console.log(error);
      Notify.failure(`${error.message}`);
    });
}

function createCarts(arr) {
  const { url } = arr[0];
  const { name: nameCat, description, temperament } = arr[0].breeds[0];
  return `<img src="${url}" alt="${nameCat}" />
<h2>${nameCat}</h2>
<p>${description}</p>
<p><span>Temperament:</span> ${temperament}</p>`;
}
