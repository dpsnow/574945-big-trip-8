import {isFunction} from '../utils.js';
import {Component} from '../component.js';
import {getTemplate} from '../template/filter-template.js';

class Filter extends Component {
  constructor(data) {
    // console.log('Filter', data);
    super();
    this._name = data.name;
    this._checked = data.checked || false;
    this._onChangeFilter = this._onChangeFilter.bind(this);
  }

  get template() {
    return getTemplate(this);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onChangeFilter(evt) {
    // console.log(`_onChangeFilter`);
    if (isFunction(this._onFilter)) {
      this._onFilter(evt);
    }
  }

  bind() {
    this._element.querySelector(`[name=filter]`).addEventListener(`change`, this._onChangeFilter);
  }
}

export {Filter};
