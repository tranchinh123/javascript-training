import { loadProductList } from './dom.js';
import { bindEvents } from './domevent.js';

const initApp = () => {
  bindEvents();
  loadProductList();
};

initApp();
