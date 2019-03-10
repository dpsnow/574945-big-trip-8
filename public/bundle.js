/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/*! exports provided: filters, typeTripPoint, getTripPoint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filters", function() { return filters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typeTripPoint", function() { return typeTripPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTripPoint", function() { return getTripPoint; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");


const filters = [
  {name: `Everything`, checked: true},
  {name: `Future`},
  {name: `Past`}
];

const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`.split(`. `);

const cities = [`Geneva`, `Amsterdam`, `Chamonix`, `Moscow`, `Berlin`, `Milan`, `Rome`, `Paris`, `Lisbon`];

const typeTripPoint = {
  'Taxi': `🚕`,
  'Bus': `🚌`,
  'Train': `🚂`,
  'Ship': `🛳️`,
  'Transport': `🚊`,
  'Drive': `🚗`,
  'Flight': `✈️`,
  'Check-in': `🏨`,
  'Sightseeing': `🏛️`,
  'Restaurant': `🍴`,
};

const allOffers = [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`];

const getOffers = () => {
  let offers = [];
  let offersName = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomArray"])(allOffers, 2);
  offersName = new Set(offersName);
  offersName.forEach((offerName) => {
    offers.push({
      name: offerName,
      price: Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInt"])(5, 50)
    });
  });
  return offers;
};

const getRandomTimeParams = () => {
  let startTime = new Date();
  startTime.setDate(startTime.getDate() + Math.floor(Math.random() * 4));
  startTime.setHours(Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInt"])(0, 24), Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInt"])(0, 60));

  let timeEnd = new Date(startTime);
  timeEnd.setHours(Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInt"])(startTime.getHours(), 23), Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInt"])(startTime.getMinutes(), 59));

  return {
    day: startTime.getTime(),
    timeStart: startTime.getTime(),
    timeEnd: timeEnd.getTime(),
    duration: `${timeEnd.getHours() - startTime.getHours()}h ${timeEnd.getMinutes() - startTime.getMinutes()}m`
  };
};


const getTripPoint = () => {
  const timeParams = getRandomTimeParams();

  return {
    type: Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomValueFromArray"])(Object.keys(typeTripPoint)),
    destination: Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomValueFromArray"])(cities),
    day: timeParams.day,
    timeStart: timeParams.timeStart,
    timeEnd: timeParams.timeEnd,
    duration: timeParams.duration,
    price: Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomInt"])(15, 250),
    offers: getOffers(),
    description: new Set(Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getRandomArray"])(descriptionText, 4, 1)),
  };
};




/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.js */ "./src/data.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* harmony import */ var _template_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template-filter.js */ "./src/template-filter.js");
/* harmony import */ var _template_trip_point_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template-trip-point.js */ "./src/template-trip-point.js");






const NUMBER_TRIP_POINTS_ON_PAGE = 7;
const MAX_TRIP_POINTS = 10;

const filtersContainer = document.querySelector(`.trip-filter`);
const tripPointContainer = document.querySelector(`.trip-day__items`);

const init = () => {
  const firstTripPoint = new Array(NUMBER_TRIP_POINTS_ON_PAGE).fill(``).map(_data_js__WEBPACK_IMPORTED_MODULE_0__["getTripPoint"]);
  Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["renderElements"])(filtersContainer, _data_js__WEBPACK_IMPORTED_MODULE_0__["filters"], _template_filter_js__WEBPACK_IMPORTED_MODULE_2__["createFilter"]);
  Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["renderElements"])(tripPointContainer, firstTripPoint, _template_trip_point_js__WEBPACK_IMPORTED_MODULE_3__["createTripPoint"]);

  filtersContainer.addEventListener(`click`, (evt) => {
    if (evt.target.nodeName === `INPUT`) {
      tripPointContainer.innerHTML = ``;
      const newQuantityTripPoint = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(1, MAX_TRIP_POINTS);
      const randomTripPoints = new Array(newQuantityTripPoint).fill(``).map(_data_js__WEBPACK_IMPORTED_MODULE_0__["getTripPoint"]);
      Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["renderElements"])(tripPointContainer, randomTripPoints, _template_trip_point_js__WEBPACK_IMPORTED_MODULE_3__["createTripPoint"]);
    }
  });
};

init();


/***/ }),

/***/ "./src/template-filter.js":
/*!********************************!*\
  !*** ./src/template-filter.js ***!
  \********************************/
/*! exports provided: createFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilter", function() { return createFilter; });
function createFilter(filterParam) {
  return `
  <input
    type="radio"
    id="filter-${filterParam.name}"
    name="filter" value="${filterParam.name}"
    ${filterParam.checked ? `checked` : ``} />
  <label class="trip-filter__item" for="filter-${filterParam.name}">
    ${filterParam.name}
  </label>`;
}




/***/ }),

/***/ "./src/template-trip-point.js":
/*!************************************!*\
  !*** ./src/template-trip-point.js ***!
  \************************************/
/*! exports provided: createTripPoint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTripPoint", function() { return createTripPoint; });
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.js */ "./src/data.js");


function createTripPoint(tripPointParam) {
  return `
    <article class="trip-point">
      <i class="trip-icon">${_data_js__WEBPACK_IMPORTED_MODULE_0__["typeTripPoint"][tripPointParam.type]}</i>
      <h3 class="trip-point__title">${tripPointParam.type} to ${tripPointParam.destination}</h3>
      <p class="trip-point__schedule">
        <span class="trip-point__timetable">${new Date(tripPointParam.timeStart).toLocaleString(`en-GB`, {hour: `numeric`, minute: `numeric`, hour12: false})} &nbsp;&mdash; ${new Date(tripPointParam.timeEnd).toLocaleString(`en-GB`, {hour: `numeric`, minute: `numeric`, hour12: false})} </span>
        <span class="trip-point__duration">${tripPointParam.duration}</span>
      </p>
      <p class="trip-point__price">&euro;&nbsp;${tripPointParam.price}</p>
      <ul class="trip-point__offers">
        ${tripPointParam.offers.map((offer) => `<li><button class="trip-point__offer">${offer.name} +&euro;&nbsp;${offer.price}</button></li>`).join(``)}
      </ul>
    </article>`;
}




/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: getRandomInt, getRandomValueFromArray, getRandomArray, renderElements */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomInt", function() { return getRandomInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomValueFromArray", function() { return getRandomValueFromArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomArray", function() { return getRandomArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderElements", function() { return renderElements; });
const parser = new DOMParser();

/**
 * Возвращает случайное целое число из заданного диапазона
 *
 * @param {Number} min - минимально возможное значение
 * @param {Number} max - максимально возможное значение
 * @return {Number}
 */
const getRandomInt = (min, max) => Math.floor(Math.random() * Math.floor((max - min) + 1) + min);


/**
 * Возвращает случайное значение из массива
 *
 * @param {Array} array - исходный массив
 * @return {any} значение массива
 */
const getRandomValueFromArray = (array) => {
  return array[getRandomInt(0, array.length - 1)];
};

/**
 * Переобразовывает HTML код элемента в DOM узлы
 *
 * @param {Sring} html - строка содержащая HTML
 * @return {NodeList} - список DOM-элемент
 */
const insertHtmlToElement = (html) => {
  const element = parser.parseFromString(html, `text/html`);
  return element.body.childNodes;
};

/**
 * Добавляет на страницу созданые из шаблона элементы
 *
 * @param {Node} container - DOM-элемент для отрисовки
 * @param {Array} elementsParam - список элементов с параметрами
 * @param {Function} createElementHtml - cоздает шаблон элементf на основе данных
 */
const renderElements = (container, elementsParam, createElementHtml) => {
  const fragment = document.createDocumentFragment();
  const elementsHtml = elementsParam.map(createElementHtml);
  elementsHtml.forEach((element) => {
    const elementsNodes = insertHtmlToElement(element);
    elementsNodes.forEach((childNode) => fragment.appendChild(childNode));
  });
  container.appendChild(fragment);
};

/**
 * Возвращает массив случайной длинны со случаные значениями
 *
 * @param {any} array - исходный массив
 * @param {Number} maxQty - максимальная длина массива
 * @param {Number} [minQty=0] - минимальная длина массива
 * @return {Array} новый массив
 */
const getRandomArray = (array, maxQty, minQty = 0) => {
  return new Array(getRandomInt(minQty, maxQty)).fill(``).map(() => getRandomValueFromArray(array));
};




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map