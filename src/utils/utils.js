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
  [...elements].forEach((element) => {
    fragment.appendChild(element);
  });
  container.appendChild(fragment);
};


const formatDate = (date, format) => {
  return moment(date, `x`).isValid() ? moment(date, `x`).format(format) : ``;
};

export {cleanNode, createElement, renderElements, showMsg, isFunction, formatDate};
