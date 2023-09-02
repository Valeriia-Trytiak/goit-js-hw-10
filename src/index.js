import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

import SlimSelect from 'slim-select';

const refs = {
  breedList: document.querySelector('.breed-select'),
  container: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.loader'),
};

refs.breedList.addEventListener('change', onChangeBreedList);

fetchBreeds()
  .then(data => {
    refs.breedList.classList.replace('breed-select-hidden', 'breed-select');
    createOption(data);
    refs.breedList.insertAdjacentHTML('beforeend', createOption(data));

    new SlimSelect({
      select: refs.breedList,
      settings: {
        placeholderText: 'Please, select a cat breed',
        // пошук
        searchText: 'Sorry nothing to see here',
        searchPlaceholder: 'Search your favorite breeds!',
        searchHighlight: true,
      },
    });
  })
  .catch(error => {
    Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
  })
  .finally(() => {
    refs.loaderEl.classList.replace('loader', 'loader-hidden');
  });

function createOption(arr) {
  return arr
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>;`;
    })
    .join('');
}

function onChangeBreedList(evt) {
  fetchCatByBreed(evt.target.value)
    .then(data => {
      refs.container.classList.replace('cat-info-hidden', 'cat-info');
      createCarts(data);
      refs.container.innerHTML = createCarts(data);
    })
    .catch(error => {
      Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
      refs.container.classList.replace('cat-info', 'cat-info-hidden');
    })
    .finally(() => {
      refs.loaderEl.classList.replace('loader', 'loader-hidden');
    });
}

function createCarts(arr) {
  const { url } = arr[0];
  const { name: nameCat, description, temperament } = arr[0].breeds[0];
  return `<img class= "cat-foto" src="${url}" alt="${nameCat}" width="300" />
<div class = "thumb"><h2 class="cat title">${nameCat}</h2>
<p class ="cat description">${description}</p>
<p class = "cat temperament"><span class= "pick-out-text">Temperament:</span> ${temperament}</p></div>`;
}
