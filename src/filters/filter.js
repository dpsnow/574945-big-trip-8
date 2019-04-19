import {Component} from '../component.js';
import {getTemplate} from './filter-template.js';

class Filter extends Component {
  constructor(data) {
    // console.log('Filter', data);
    super();
    this._name = data.name;
    this._checked = data.checked || false;
    this._onFilter = data.onFilter;
  }

  get template() {
    return getTemplate(this);
  }

}

export {Filter};
