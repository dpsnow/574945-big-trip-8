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
/*! exports provided: listFilter, listTripPoint */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listFilter", function() { return listFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listTripPoint", function() { return listTripPoint; });

const listFilter = [
  {name: `Everything`, checked: true},
  {name: `Future`},
  {name: `Past`}
];

const listTripPoint = [
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
/* harmony import */ var _templateFilter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./templateFilter.js */ "./src/templateFilter.js");
/* harmony import */ var _templateTripPoint_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./templateTripPoint.js */ "./src/templateTripPoint.js");






const COUNT_TRIP_POINT_FIRST = 4;
const MAX_TRIP_POINT = 10;

const filtersContainer = document.querySelector(`.trip-filter`);
const tripPointContainer = document.querySelector(`.trip-day__items`);

const renderFilters = (container, parametrsFilters) => {
  const fragment = document.createDocumentFragment();
  const filters = parametrsFilters.map(_templateFilter_js__WEBPACK_IMPORTED_MODULE_2__["createFilter"]);
  filters.forEach((element) => {
    Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["insertHtmlToElement"])(element, fragment);
  });
  container.appendChild(fragment);
};

const renderTripPoint = (container, parametrsTripPoint) => {
  const fragment = document.createDocumentFragment();
  const tripPoints = parametrsTripPoint.map(_templateTripPoint_js__WEBPACK_IMPORTED_MODULE_3__["createTripPoint"]);
  tripPoints.forEach((element) => {
    Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["insertHtmlToElement"])(element, fragment);
  });
  container.appendChild(fragment);
};

const init = () => {
  const firstTripPoint = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["getNewListTripPoints"])(COUNT_TRIP_POINT_FIRST, _data_js__WEBPACK_IMPORTED_MODULE_0__["listTripPoint"]);
  renderFilters(filtersContainer, _data_js__WEBPACK_IMPORTED_MODULE_0__["listFilter"]);
  renderTripPoint(tripPointContainer, firstTripPoint);

  filtersContainer.addEventListener(`click`, (evt) => {
    if (evt.target.nodeName === `INPUT`) {
      tripPointContainer.innerHTML = ``;
      const newCounttripPoint = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["getRandomInt"])(1, MAX_TRIP_POINT);
      const randomTripPoint = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["getNewListTripPoints"])(newCounttripPoint, _data_js__WEBPACK_IMPORTED_MODULE_0__["listTripPoint"]);
      renderTripPoint(tripPointContainer, randomTripPoint);
    }
  });
};

init();


/***/ }),

/***/ "./src/templateFilter.js":
/*!*******************************!*\
  !*** ./src/templateFilter.js ***!
  \*******************************/
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

/***/ "./src/templateTripPoint.js":
/*!**********************************!*\
  !*** ./src/templateTripPoint.js ***!
  \**********************************/
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
/*! exports provided: getRandomInt, insertHtmlToElement, getNewListTripPoints */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomInt", function() { return getRandomInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertHtmlToElement", function() { return insertHtmlToElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNewListTripPoints", function() { return getNewListTripPoints; });
const parser = new DOMParser();

const getRandomInt = (min, max) => Math.floor(Math.random() * Math.floor((max - min) + 1) + min);

const insertHtmlToElement = (html, container) => {
  const element = parser.parseFromString(html, `text/html`);
  const cardChildren = element.body.childNodes;
  cardChildren.forEach((childNode) => container.appendChild(childNode));
};

/**
 * Возвращает случаные собития маршрита нужного количества
 *
 * @param {Number} count - новое количество
 * @param {Array} arrayTripPoint - исходный массив событий
 * @return {Array} новый массив событий
 */
const getNewListTripPoints = (count, arrayTripPoint) => {
  const newArrayTripPoint = [];
  for (let i = 0; i < count; i++) {
    const j = getRandomInt(0, arrayTripPoint.length - 1);
    newArrayTripPoint.push(arrayTripPoint[j]);
  }

  return newArrayTripPoint;
};




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map