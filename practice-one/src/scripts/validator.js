import { imgURL, price, quantity, nameProduct } from './dom.js';
import MESSAGE from './constants/message.js';

const showError = (input, message) => {
  const parent = input.parentElement;
  const formMessage = parent.querySelector('.form-message');

  parent.classList.add('invalid');
  formMessage.innerText = message;
};

const showSuccess = (input) => {
  const parent = input.parentElement;
  const formMessage = parent.querySelector('.form-message');

  parent.classList.remove('invalid');
  formMessage.innerText = '';
};

const checkEmptyError = (input) => {
  let isEmptyError = false;
  input.value = input.value.trim();
  if (!input.value) {
    isEmptyError = true;
    showError(input, MESSAGE.EMPTY_ERROR);
  } else {
    showSuccess(input);
  }
  return isEmptyError;
};

const checkImgUrlError = (input, isRequired) => {
  const regexImgUrl = new RegExp('(https?://.*.(?:png|jpg|jpeg|gif|png|svg))');
  input.value = input.value.trim();
  const isImgUrlError = !regexImgUrl.test(input.value);

  // Check empty
  if (isRequired && !input.value) {
    showError(input, 'The field cannot be empty.');
  } else if (regexImgUrl.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, MESSAGE.IMG_URL_ERROR);
  }

  return isImgUrlError;
};

const checkIsNumberIntegerError = (input, isRequired) => {
  input.value = input.value.trim();
  const numberInt = Number(input.value);
  let isNumberIntError = false;

  // Check empty
  if (isRequired && !input.value) {
    isNumberIntError = true;
    showError(input, 'The field cannot be empty.');
  } else if (Number.isInteger(numberInt) && numberInt > 0) {
    isNumberIntError = false;
    showSuccess(input);
  } else {
    isNumberIntError = true;
    showError(input, MESSAGE.NUMBER_INTEGER_ERROR);
  }

  return isNumberIntError;
};

const checkIsDecimalError = (input, isRequired) => {
  input.value = input.value.trim();
  const numberDec = Number(input.value);
  let isNumberDecimalError = false;
  // Check empty
  if (isRequired && !input.value) {
    isNumberDecimalError = true;
    showError(input, 'The field cannot be empty.');
  } else if (!isNaN(numberDec) && numberDec > 0) {
    isNumberDecimalError = false;
    showSuccess(input);
  } else {
    isNumberDecimalError = true;
    showError(input, MESSAGE.NUMBER_DECIMAL_ERROR);
  }
  return isNumberDecimalError;
};

const validateForm = () => {
  const isImgUrlError = checkImgUrlError(imgURL, true);
  const isNumberIntError = checkIsNumberIntegerError(quantity, true);
  const isNumberDecError = checkIsDecimalError(price, true);
  const isEmptyError = checkEmptyError(nameProduct);

  if (isEmptyError || isImgUrlError || isNumberIntError || isNumberDecError) {
    return false;
  } else {
    return true;
  }
};

export {
  validateForm,
  showSuccess,
  showError,
  checkEmptyError,
  checkImgUrlError,
  checkIsDecimalError,
  checkIsNumberIntegerError,
};
