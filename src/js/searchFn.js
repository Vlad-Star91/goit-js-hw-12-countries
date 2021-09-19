import countriesCard from "../templates/countries-tmp.hbs";
import listCountries from "../templates/countries-list-tmp.hbs";
import OnSearch from "./fetchCountries.js";
import { error } from './error.js';

const debounce = require('lodash.debounce');
const containerCard = document.querySelector('.formCard');
const inputEl = document.querySelector('.search');

inputEl.addEventListener('input', debounce(onSearchCountries, 500));
const onSearch = new OnSearch();

function onSearchCountries(e) {
    clearContainer();
    if (e.target.value.length < 1) {
        return;
    }
    onSearch.query = e.target.value;
    onSearch.searchCountries().then(createMarkup).catch(error => {
        alert('Error! This country not found');
    });
}

function createMarkup(data) {
     if (data.length === 1) {
    createMarkupCard(data);
  } else if (data.length > 1 && data.length <= 10) {
    createMarkupList(data);
  } else if (data.length > 10) {
    error({
      title: 'Too many matches found. Please enter a more specific query!',
      delay: 2000,
    });
  }
}

function createMarkupCard(data) {
    const markup = countriesCard(data);
    containerCard.insertAdjacentHTML('beforeend', markup);
}

function createMarkupList(data) {
    const markup = listCountries(data);
    containerCard.insertAdjacentHTML('beforeend', markup);
}

function clearContainer() {
    containerCard.innerHTML = '';
}