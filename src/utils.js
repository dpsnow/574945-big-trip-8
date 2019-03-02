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

export {getRandomInt, renderElements, getNewListTripPoints};
