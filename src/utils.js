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
 * @param {Function} getTripPoint - функция возвращающая объект с данными для собитий маршрута
 * @return {Array} новый массив событий
 */
const getNewListTripPoints = (quantity, getTripPoint) => {
  return new Array(quantity).fill(``).map(()=>{
    return getTripPoint();
  });
};

export {getRandomInt, renderElements, getNewListTripPoints};
