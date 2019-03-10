const parser = new DOMParser();

const getRandomBoolean = () => !!(Math.random() > 0.5);

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

export {getRandomBoolean, getRandomInt, getRandomValueFromArray, getRandomArray, createElement, renderElements};
