import {
  showAddProductModal,
  hideAddProductModal,
  handleAddProduct,
  imgURL,
  price,
  quantity,
  nameProduct,
} from './dom.js';
import {
  showSuccess,
  checkImgUrlError,
  checkEmptyError,
  checkIsDecimalError,
  checkIsNumberIntegerError,
} from './validator.js';
import { getElement } from './helpers/queryDOM.js';

const cardAdd = getElement('.card-add');
const cancelBtn = getElement('.btn-cancel');
const modalContainerAdd = getElement('.modal-container-add');
const modal = getElement('.modal');

const form = getElement('#form-add');

const bindEvents = () => {
  cardAdd.addEventListener('click', showAddProductModal);
  cancelBtn.addEventListener('click', hideAddProductModal);
  modal.addEventListener('click', hideAddProductModal);
  form.addEventListener('submit', handleAddProduct);
  modalContainerAdd.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  //Event on blur input form
  const listInput = [nameProduct, price, imgURL, quantity];

  nameProduct.addEventListener('blur', () => {
    checkEmptyError(nameProduct);
  });

  price.addEventListener('blur', () => {
    checkIsDecimalError(price, true);
  });

  imgURL.addEventListener('blur', () => {
    checkImgUrlError(imgURL, true);
  });

  quantity.addEventListener('blur', () => {
    checkIsNumberIntegerError(quantity, true);
  });

  //Event on input form
  listInput.forEach((input) => {
    input.addEventListener('input', () => {
      showSuccess(input);
    });
  });
};

export { bindEvents };
