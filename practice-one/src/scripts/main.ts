import { loadProductList } from './dom.js';
import { bindEvents } from './events.js';

const initApp = () => {
  bindEvents();
  loadProductList();
};

initApp();
