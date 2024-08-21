import { imgURLEle, priceEle, quantityEle, nameProductEle } from './dom.js';

const checkEmptyError = (input: HTMLInputElement) => {
  let isEmptyError = false;
  input.value = input.value.trim();
  if (!input.value) {
    isEmptyError = true;
  } else {
    isEmptyError = false;
  }
  return isEmptyError;
};

const checkImgUrlError = (input: HTMLInputElement) => {
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

const checkIsNumberIntegerError = (input: HTMLInputElement) => {
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

const checkIsDecimalError = (input: HTMLInputElement) => {
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
  const isImgUrlError = checkImgUrlError(imgURLEle);
  const isEmptyErrorImg = checkEmptyError(imgURLEle);
  const isNumberIntError = checkIsNumberIntegerError(quantityEle);
  const isEmptyErrorQuantity = checkEmptyError(quantityEle);
  const isNumberDecError = checkIsDecimalError(priceEle);
  const isEmptyErrorPrice = checkEmptyError(priceEle);
  const isEmptyErrorName = checkEmptyError(nameProductEle);

  return {
    isEmptyErrorName,
    isImgUrlError,
    isNumberIntError,
    isNumberDecError,
    isEmptyErrorPrice,
    isEmptyErrorQuantity,
    isEmptyErrorImg,
  };
};

export {
  validateFormAdd,
  checkEmptyError,
  checkImgUrlError,
  checkIsDecimalError,
  checkIsNumberIntegerError,
};
