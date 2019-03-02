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

export {getRandomInt, insertHtmlToElement, getNewListTripPoints};
