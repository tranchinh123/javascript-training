// query DOM
const productList = document.querySelector('.product-list');
const cardAdd = document.querySelector('.card-add');
const modal = document.querySelector('.modal');
const cancelBtn = document.querySelector('.btn-cancel');
const modalContainer = document.querySelector('.modal-container');
const createButton = document.querySelector('.btn-save');

const nameProduct = document.querySelector('input[name ="name-product"]');

const price = document.querySelector('input[name ="price-product"]');

const imgURL = document.querySelector('input[name ="img-product"]');

const quantity = document.querySelector('input[name ="quantity-product"]');

//...

const showAddProductModal = () => {
	modal.classList.add('open');
};
const hideAddProductModal = () => {
	modal.classList.remove('open');
};

const renderProductItem = (food) => {
	return `
            <div class="card card-product card-id-${food.id}">
                                <div class="card-header">
                                    <button class="icon-delete icon-id-${food.id}" onclick="handleDeleteProduct(${food.id})">&#9747;</button>
                                </div>
    
                                <div class="card-main">
                                    <img src="${food.image}" alt="default image" class="img-product" onerror="this.src='https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg'" />
                                    <div class="desc-product">
                                        <p class="name-product">${food.name}</p>
                                        <span class="price-product">$ ${food.price}</span>
                                        <span class="dot">&#8226</span>
                                        <span class="quantity-product">${food.quantity} bowls</span>
                                    </div>
                                </div>
                                <div class="card-footer">
                                        <img src="./assets/icons/Vector.svg" alt="">
                                        <p class="text-edit">Edit dish</p>
                                </div>
                    </div>
            `;
};

const handleAddSuccess = (food) => {
	const newItem = renderProductItem(food);

	productList.innerHTML += newItem;
	hideAddProductModal();
};

// validate form

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

const checkEmptyError = (listInput) => {
	let isEmptyError = false;
	listInput.forEach((input) => {
		input.value = input.value.trim();
		if (!input.value) {
			isEmptyError = true;
			showError(input, ' The field cannot be empty.');
		} else {
			showSuccess(input);
		}
	});

	return isEmptyError;
};

const checkImgUrlError = (input) => {
	const regexImgUrl = new RegExp('(https?://.*.(?:png|jpg|jpeg|gif|png|svg))');
	input.value = input.value.trim();
	const isImgUrlError = !regexImgUrl.test(input.value);
	if (regexImgUrl.test(input.value)) {
		showSuccess(input);
	} else {
		showError(input, 'Image URL format is valid');
	}

	return isImgUrlError;
};

const checkIsNumberIntegerError = (input) => {
	input.value = input.value.trim();
	const numberInt = Number(input.value);
	let isNumberIntError = false;
	if (
		typeof numberInt === 'number' &&
		Number.isInteger(numberInt) &&
		numberInt > 0
	) {
		isNumberIntError = false;
		showSuccess(input);
	} else {
		isNumberIntError = true;
		showError(
			input,
			'Please enter the number greater than 0 and number is integer '
		);
	}
	return isNumberIntError;
};

const checkIsDecimalError = (input) => {
	input.value = input.value.trim();
	const numberDec = Number(input.value);
	let isNumberDecimalError = false;
	if (typeof numberDec === 'number' && !isNaN(numberDec) && numberDec > 0) {
		isNumberDecimalError = false;
		showSuccess(input);
	} else {
		isNumberDecimalError = true;
		showError(input, 'Please enter the number greater than 0 ');
	}
	return isNumberDecimalError;
};
const validateForm = () => {
	const isEmptyError = checkEmptyError([nameProduct, price, imgURL, quantity]);
	const isImgUrlError = checkImgUrlError(imgURL);
	const isNumberIntError = checkIsNumberIntegerError(quantity);
	const isNumberDecError = checkIsDecimalError(price);

	if (isEmptyError || isImgUrlError || isNumberIntError || isNumberDecError) {
		return false;
	} else {
		return true;
	}
};

const handleAddProduct = (e) => {
	e.preventDefault();
	const name = document.querySelector('input[name ="name-product"]').value;

	const price = document.querySelector('input[name ="price-product"]').value;

	const imgURL = document.querySelector('input[name ="img-product"]').value;

	const quantity = document.querySelector(
		'input[name ="quantity-product"]'
	).value;
	const formData = {
		name: name,
		price: price,
		image: imgURL,
		quantity: quantity,
	};

	const isValid = validateForm();
	if (isValid) {
		createProduct(formData, handleAddSuccess);
	} else {
		console.log('Error');
	}
};

const bindEvents = () => {
	cardAdd.addEventListener('click', showAddProductModal);
	cancelBtn.addEventListener('click', hideAddProductModal);
	modal.addEventListener('click', hideAddProductModal);
	createButton.addEventListener('click', handleAddProduct);
	modalContainer.addEventListener('click', (e) => {
		e.stopPropagation();
	});
	price.addEventListener('blur', () => {
		price.value = price.value.trim();
		checkIsDecimalError(price);
	});
	imgURL.addEventListener('blur', () => {
		imgURL.value = imgURL.value.trim();
		checkImgUrlError(imgURL);
	});
	quantity.addEventListener('blur', () => {
		quantity.value = quantity.value.trim();
		checkIsNumberIntegerError(quantity);
	});
};

//APIs => return product list
const getProducts = async () => {
	try {
		const response = await fetch(
			'https://5f7c244700bd74001690a4a7.mockapi.io/products',
			{
				method: 'GET',
				headers: { 'content-type': 'application/json' },
			}
		);
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			throw new Error('404');
		}
	} catch (error) {
		// toast message
		console.error('Something went wrong ', error);
	}
};

const createProduct = async (data, callback) => {
	try {
		const response = await fetch(
			'https://5f7c244700bd74001690a4a7.mockapi.io/products',
			{
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(data),
			}
		);
		if (response.ok) {
			const data = await response.json();
			return callback(data);
		} else {
			throw new Error('404');
		}
	} catch (error) {
		console.error('Something went wrong', error);
	}
};

const renderFoods = (foods) => {
	const cardProduct = foods.map(renderProductItem);

	productList.innerHTML = cardProduct.join('');
};

const handleDeleteProduct = async (id) => {
	try {
		const response = await fetch(
			`https://5f7c244700bd74001690a4a7.mockapi.io/products/${id}`,
			{
				method: 'DELETE',
			}
		);
		if (response.ok) {
			const cardItem = document.querySelector('.card-id-' + id);
			if (cardItem) {
				cardItem.remove();
			}
		} else {
			throw new Error('404');
		}
	} catch (error) {
		console.error('Something went wrong ', error);
	}
};

// Handle show product list
const loadProductList = async () => {
	const products = await getProducts();
	renderFoods(products);
};

const initApp = () => {
	bindEvents();
	loadProductList();
	handleDeleteProduct();
};
initApp();
