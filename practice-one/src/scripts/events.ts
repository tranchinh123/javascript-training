import {
  showAddProductModal,
  hideAddProductModal,
  handleAddProduct,
  imgURL,
  price,
  quantity,
  nameProduct,
  showSuccess,
  showError,
} from './dom.js';
import {
  checkImgUrlError,
  checkEmptyError,
  checkIsDecimalError,
  checkIsNumberIntegerError,
} from './validator.js';
import { getElement } from './helpers/queryDOM.js';
import MESSAGE from './constants/message.js';

const cardAdd = getElement('.card-add');
const cancelBtn = getElement('.btn-cancel');
const modalContainerAdd = getElement('.modal-container-add');
const modal = getElement('.modal');

const form = getElement('#form-add');

const bindEvents = () => {
  cardAdd?.addEventListener('click', showAddProductModal);
  cancelBtn?.addEventListener('click', hideAddProductModal);
  modal?.addEventListener('click', hideAddProductModal);
  form?.addEventListener('submit', handleAddProduct);
  modalContainerAdd?.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  //Event on blur input form
  const listInput = [nameProduct, price, imgURL, quantity];

  nameProduct?.addEventListener('blur', () => {
    if (checkEmptyError(nameProduct)) {
      showError(nameProduct, MESSAGE.EMPTY_ERROR);
    }
  });

  price?.addEventListener('blur', () => {
    if (price?.value.trim() === '') {
      showError(price, MESSAGE.EMPTY_ERROR);
    } else if (checkIsDecimalError(price)) {
      showError(price, MESSAGE.NUMBER_DECIMAL_ERROR);
    }
  });

  imgURL.addEventListener('blur', () => {
    if (imgURL.value.trim() === '') {
      showError(imgURL, MESSAGE.EMPTY_ERROR);
    } else if (checkImgUrlError(imgURL)) {
      showError(imgURL, MESSAGE.IMG_URL_ERROR);
    }
  });

  quantity.addEventListener('blur', () => {
    if (quantity.value.trim() === '') {
      showError(imgURL, MESSAGE.EMPTY_ERROR);
    } else if (checkIsNumberIntegerError(quantity)) {
      showError(quantity, MESSAGE.NUMBER_INTEGER_ERROR);
    }
  });

  //Event on input form
  listInput.forEach((input) => {
    input.addEventListener('input', () => {
      showSuccess(input);
    });
  });
};

export { bindEvents };
