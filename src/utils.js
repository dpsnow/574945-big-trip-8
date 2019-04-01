import moment from 'moment';

const parser = new DOMParser();

const getRandomBoolean = () => !!(Math.random() > 0.5);

const isFunction = (value) => {
  return typeof value === `function`;
};

/**
 * Возвращает случайное целое число из заданного диапазона
 *
 * @param {Number} min - минимально возможное значение
 * @param {Number} max - максимально возможное значение
 * @return {Number}
 */
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;


/**
 * Возвращает случайное значение из массива
 *
 * @param {Array} array - исходный массив
 * @return {any} значение массива
 */
const getRandomValueFromArray = (array) => {
  return array[getRandomInt(0, array.length)];
};

/**
 * Переобразовывает HTML код элемента в DOM узлы
 *
 * @param {Sring} html - строка содержащая HTML
 * @return {NodeList} - список DOM-элемент
 */
const createElement = (html) => {
  const element = parser.parseFromString(html, `text/html`);
  // console.log(`createElement childNodes`, element.body.childNodes);
  return element.body.childNodes;
};

/**
 * Добавляет на страницу созданые из шаблона элементы
 *
 * @param {Node} container - DOM-элемент для отрисовки
 * @param {Array} elements - массив элементов

 */
const renderElements = (container, elements) => {
  const fragment = document.createDocumentFragment();
  elements.forEach((element) => {
    // console.log(element);
    fragment.appendChild(element);
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

const formatDate = (date, format) => {
  // console.log(`formatDate:, date = ${date} typeof ${typeof date},  format = ${format}  typeof ${typeof format}`);
  return moment(date).isValid() ? moment(date).format(format) : ``;
};

const updateTime = (date, time) => {
  // console.log(`formatDate:, date = ${date} typeof ${typeof date},  format = ${time}  typeof ${typeof time}`);
  const [hours, minutes] = time.split(`:`);
  return moment(date, `x`).hours(+hours).minutes(+minutes).format(`x`);
};

export {getRandomBoolean, getRandomInt, getRandomValueFromArray, getRandomArray, createElement, renderElements, isFunction, formatDate, updateTime};
