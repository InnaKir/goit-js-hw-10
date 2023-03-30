import './css/styles.css';

const DEBOUNCE_DELAY = 300;

import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener(
  'input',
  debounce(e => {
    const trimmedValue = input.value.trim();
    cleanHtml();
    if (trimmedValue !== '') {
      fetchCountries(trimmedValue).then(foundData => {
        if (foundData.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (foundData.length === 0) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        } else if (foundData.length >= 2 && foundData.length <= 10) {
          showCountryList(foundData);
        } else if (foundData.length === 1) {
          showSingleCountry(foundData);
        }
      });
    }
  }, DEBOUNCE_DELAY)
);

function showCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
         <b>${country.name.official}</p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function showSingleCountry(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
         <b>${country.name.official}</b></p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function cleanHtml() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

// фикс gpt

// import { fetchCountries } from './fetchCountries';
// import Notiflix from 'notiflix';
// import debounce from 'lodash.debounce';

// const DEBOUNCE_DELAY = 300;
// const input = document.querySelector('#search-box');
// const countryList = document.querySelector('.country-list');
// const countryInfo = document.querySelector('.country-info');
// const noti = Notiflix.Notify;

// input.addEventListener(
//   'input',
//   debounce(({ target: { value } }) => {
//     cleanHTML();
//     if (value.trim() !== '') {
//       fetchCountries(value.trim()).then(foundData => {
//         const foundDataLen = foundData.length;
//         if (foundDataLen >= 2 && foundDataLen <= 10) {
//           updateCountryList(foundData);
//         } else if (foundDataLen === 1) {
//           updateCountryInfo(foundData[0]);
//         } else if (foundDataLen > 10) {
//           noti.info(
//             'Too many matches found. Please enter a more specific name.'
//           );
//         } else {
//           noti.failure('Sorry, there is no country with that name');
//         }
//       });
//     }
//   }, DEBOUNCE_DELAY)
// );

// function updateCountryList(countries) {
//   const markup = countries
//     .map(
//       ({ name, flags }) =>
//         `<li>
//       <img src="${flags.svg}" alt="Flag of ${name.official}" width="30" height="20">
//       <b>${name.official}</b>
//     </li>`
//     )
//     .join('');

//   countryList.innerHTML = markup;
// }

// function updateCountryInfo(country) {
//   const { name, flags, capital, population, languages } = country;
//   const markup = `
//     <li>
//       <img src="${flags.svg}" alt="Flag of ${
//     name.official
//   }" width="30" height="20">
//       <b>${name.official}</b>
//       <p><b>Capital</b>: ${capital}</p>
//       <p><b>Population</b>: ${population.toLocaleString()}</p>
//       <p><b>Languages</b>: ${Object.values(languages).join(', ')} </p>
//     </li>
//   `;
//   countryInfo.innerHTML = markup;
// }

// function cleanHTML() {
//   countryList.innerHTML = '';
//   countryInfo.innerHTML = '';
// }
