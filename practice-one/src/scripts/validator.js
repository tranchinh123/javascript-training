import { imgURL, price, quantity, nameProduct } from './dom.js';

const checkEmptyError = (input) => {
  let isEmptyError = false;
  input.value = input.value.trim();
  if (!input.value) {
    isEmptyError = true;
  } else {
    isEmptyError = false;
  }
  return isEmptyError;
};

const checkImgUrlError = (input) => {
  const regexImgUrl = new RegExp('(https?://.*.(?:png|jpg|jpeg|gif|png|svg))');
  input.value = input.value.trim();
  let isImgUrlError = false;

  if (regexImgUrl.test(input.value)) {
    isImgUrlError = false;
  } else {
    isImgUrlError = true;
  }

  return isImgUrlError;
};

const checkIsNumberIntegerError = (input) => {
  input.value = input.value.trim();
  const numberInt = Number(input.value);
  let isNumberIntError = false;

  if (Number.isInteger(numberInt) && numberInt > 0) {
    isNumberIntError = false;
  } else {
    isNumberIntError = true;
  }

  return isNumberIntError;
};

const checkIsDecimalError = (input) => {
  input.value = input.value.trim();
  const numberDec = Number(input.value);
  let isNumberDecimalError = false;

  if (!isNaN(numberDec) && numberDec > 0) {
    isNumberDecimalError = false;
  } else {
    isNumberDecimalError = true;
  }
  return isNumberDecimalError;
};

const validateFormAdd = () => {
  const isImgUrlError = checkImgUrlError(imgURL, true);
  const isNumberIntError = checkIsNumberIntegerError(quantity, true);
  const isNumberDecError = checkIsDecimalError(price, true);
  const isEmptyError = checkEmptyError(nameProduct);

  return { isEmptyError, isImgUrlError, isNumberIntError, isNumberDecError };
};

export {
  validateFormAdd,
  checkEmptyError,
  checkImgUrlError,
  checkIsDecimalError,
  checkIsNumberIntegerError,
};
