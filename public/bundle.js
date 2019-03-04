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
/*! exports provided: filters, tripPoints */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filters", function() { return filters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tripPoints", function() { return tripPoints; });
const filters = [
  {name: `Everything`, checked: true},
  {name: `Future`},
  {name: `Past`}
];

const tripPoints = [
  {
    icon: `🚕`,
    title: `Taxi to Airport`,
    timeStart: `10:00`,
    timeEnd: `11:00`,
    duration: `1h 30m`,
    price: `20`,
    offers: [
      {
        name: `Order UBER`,
        price: `20`
      },
      {
        name: `Upgrade to business`,
        price: `20`
      }
    ]
  },
  {
    icon: `✈`,
    title: `Flight to Geneva`,
    timeStart: `10:00`,
    timeEnd: `11:00`,
    duration: `1h 30m`,
    price: `20`,
    offers: [
      {
        name: `Upgrade to business`,
        price: `20`
      },
      {
        name: `Select meal`,
        price: `20`
      }
    ]
  },
  {
    icon: `🚗`,
    title: `Drive to Chamonix`,
    timeStart: `10:00`,
    timeEnd: `11:00`,
    duration: `1h 30m`,
    price: `20`,
    offers: [
      {
        name: `Rent a car`,
        price: `20`
      }
    ]
  },
  {
    icon: `🝨`,
    title: `Check into a hotel`,
    timeStart: `10:00`,
    timeEnd: `11:00`,
    duration: `1h 30m`,
    price: `20`,
    offers: [
      {
        name: `Add breakfast`,
        price: `20`
      }
    ]
  },
];





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
  const firstTripPoint = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["getNewListTripPoints"])(NUMBER_TRIP_POINTS_ON_PAGE, _data_js__WEBPACK_IMPORTED_MODULE_0__["tripPoints"]);
  Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["renderElements"])(filtersContainer, _data_js__WEBPACK_IMPORTED_MODULE_0__["filters"], _template_filter_js__WEBPACK_IMPORTED_MODULE_2__["createFilter"]);
  Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["renderElements"])(tripPointContainer, firstTripPoint, _template_trip_point_js__WEBPACK_IMPORTED_MODULE_3__["createTripPoint"]);

  filtersContainer.addEventListener(`click`, (evt) => {
    if (evt.target.nodeName === `INPUT`) {
      tripPointContainer.innerHTML = ``;
      const newQuantityTripPoint = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(1, MAX_TRIP_POINTS);
      const randomTripPoints = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["getNewListTripPoints"])(newQuantityTripPoint, _data_js__WEBPACK_IMPORTED_MODULE_0__["tripPoints"]);
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
function createTripPoint(tripPointParam) {
  let offers = ``;
  tripPointParam.offers.forEach((offer) => {
    offers += `
      <li>
        <button class="trip-point__offer">${offer.name} +&euro;&nbsp;${offer.price}</button>
      </li>`;
  });
  return `
    <article class="trip-point">
      <i class="trip-icon">${tripPointParam.icon}</i>
      <h3 class="trip-point__title">${tripPointParam.title}</h3>
      <p class="trip-point__schedule">
        <span class="trip-point__timetable">${tripPointParam.timeStart}&nbsp;&mdash; ${tripPointParam.timeEnd}</span>
        <span class="trip-point__duration">${tripPointParam.duration}</span>
      </p>
      <p class="trip-point__price">&euro;&nbsp;${tripPointParam.price}</p>
      <ul class="trip-point__offers">
        ${offers}
      </ul>
    </article>`;
}




/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: getRandomInt, renderElements, getNewListTripPoints */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomInt", function() { return getRandomInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderElements", function() { return renderElements; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNewListTripPoints", function() { return getNewListTripPoints; });
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
 * Переобразовывает HTML код элемента в DOM узлы
 *
 * @param {Sring} html - строка содержащая HTML
 * @param {Node} container - DOM-элемент для отрисовки
 */
const insertHtmlToElement = (html, container) => {
  const element = parser.parseFromString(html, `text/html`);
  const cardChildren = element.body.childNodes;
  cardChildren.forEach((childNode) => container.appendChild(childNode));
};

/**
 * Добавляет на страницу созданые из шаблона элементы
 *
 * @param {Node} container - DOM-элемент для отрисовки
 * @param {Array} elements - список элементов с параметрами
 * @param {Function} createElementHtml - функция изменения шаблона элемента на основе параметров
 */
const renderElements = (container, elements, createElementHtml) => {
  const fragment = document.createDocumentFragment();
  const elementsHtml = elements.map(createElementHtml);
  elementsHtml.forEach((element) => {
    insertHtmlToElement(element, fragment);
  });
  container.appendChild(fragment);
};

/**
 * Возвращает случаные события маршрута заданного количества
 *
 * @param {Number} quantity - новое количество
 * @param {Array} arrayTripPoint - исходный массив событий
 * @return {Array} новый массив событий
 */
const getNewListTripPoints = (quantity, arrayTripPoint) => {
  const newArrayTripPoint = [];
  for (let i = 0; i < quantity; i++) {
    const j = getRandomInt(0, arrayTripPoint.length - 1);
    newArrayTripPoint.push(arrayTripPoint[j]);
  }
  return newArrayTripPoint;
};




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map