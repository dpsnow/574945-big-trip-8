import moment from 'moment';

const parser = new DOMParser();

const isFunction = (value) => {
  return typeof value === `function`;
};

const cleanNode = (node) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

const showMsg = (msg, node, state = true) => {
  node.classList.toggle(`show`, state);
  node.textContent = msg;
};


/**
 * Переобразовывает HTML код элемента в DOM узлы
 *
 * @param {Sring} html - строка содержащая HTML
 * @return {NodeList} - список DOM-элемент
 */
const createElement = (html) => {
  // console.log(html);
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
  // console.log(elements);
  [...elements].forEach((element) => {
    // console.log(element);
    fragment.appendChild(element);
  });
  container.appendChild(fragment);
};


const formatDate = (date, format) => {
  // console.log(`formatDate:, date = ${date} typeof ${typeof date},  format = ${format}  typeof ${typeof format}`);
  return moment(date, `x`).isValid() ? moment(date, `x`).format(format) : ``;
};

export {cleanNode, createElement, renderElements, showMsg, isFunction, formatDate};
