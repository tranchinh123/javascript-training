import {
	showAddProductModal,
	hideAddProductModal,
	loadProductList,
	handleAddProduct,
	imgURL,
	price,
	quantity,
	nameProduct,
} from './dom.js';
import {
	showSuccess,
	showError,
	checkImgUrlError,
	checkIsDecimalError,
	checkIsNumberIntegerError,
} from './validator.js';
import { getElement } from './helpers/queryDOM.js';

const cardAdd = getElement('.card-add');
const cancelBtn = getElement('.btn-cancel');
const createButton = getElement('.btn-save');
const modalContainerAdd = getElement('.modal-container-add');
const modal = getElement('.modal');

const bindEvents = () => {
	cardAdd.addEventListener('click', showAddProductModal);
	cancelBtn.addEventListener('click', hideAddProductModal);
	modal.addEventListener('click', hideAddProductModal);
	createButton.addEventListener('click', handleAddProduct);
	modalContainerAdd.addEventListener('click', (e) => {
		e.stopPropagation();
	});

	//Event on blur input form
	const listInput = [nameProduct, price, imgURL, quantity];

	listInput.forEach((input) => {
		input.addEventListener('blur', () => {
			if (!input.value && input.value === '') {
				showError(input, ' The field cannot be empty.');
			} else {
				showSuccess(input);
			}
		});
	});

	price.addEventListener('blur', () => {
		checkIsDecimalError(price);
	});

	imgURL.addEventListener('blur', () => {
		checkImgUrlError(imgURL);
	});

	quantity.addEventListener('blur', () => {
		checkIsNumberIntegerError(quantity);
	});

	listInput.forEach((input) => {
		input.addEventListener('input', () => {
			showSuccess(input);
		});
	});
};

const initApp = () => {
	bindEvents();
	loadProductList();
};

initApp();
