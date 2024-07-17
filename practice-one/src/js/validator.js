function validator(options) {
	const selectorRules = {};
	function validate(inputElement, rule) {
		const errorElement = inputElement.parentElement.querySelector(
			options.errorSelector
		);
		let errorMessage;

		const rules = selectorRules[rule.selector];

		for (let i = 0; i < rules.length; i++) {
			errorMessage = rules[i](inputElement.value);
			if (errorMessage) break;
		}
		if (errorMessage) {
			errorElement.innerText = errorMessage;
			inputElement.parentElement.classList.add('invalid');
		} else {
			errorElement.innerText = '';
			inputElement.parentElement.classList.remove('invalid');
		}
		return !errorMessage;
	}

	// element of form need validate

	const formElement = document.querySelector(options.form);
	if (formElement) {
		formElement.onsubmit = (e) => {
			e.preventDefault();
			let isFormValid = true;
			// Loop through each rule and validate
			options.rules.forEach((rule) => {
				const inputElement = formElement.querySelector(rule.selector);
				const isValid = validate(inputElement, rule);
				if (!isValid) {
					isFormValid = false;
				}
			});

			if (isFormValid) {
				if (typeof options.onSubmit === 'function') {
					const enableInputs = formElement.querySelectorAll('[name]');

					const formValues = Array.from(enableInputs).reduce(
						(values, input) => {
							return (values[input.name] = input.value) && values;
						},
						{}
					);
					options.onSubmit(formValues);
				}
			}
		};

		options.rules.forEach((rule) => {
			// Save rules for input

			if (Array.isArray(selectorRules[rule.selector])) {
				selectorRules[rule.selector].push(rule.test);
			} else {
				selectorRules[rule.selector] = [rule.test];
			}

			const inputElement = formElement.querySelector(rule.selector);
			const errorElement = inputElement.parentElement.querySelector(
				options.errorSelector
			);
			if (inputElement) {
				// handle event blur
				inputElement.onblur = () => {
					validate(inputElement, rule);
				};
				// handle event oninput
				inputElement.oninput = () => {
					errorElement.innerText = '';
					inputElement.parentElement.classList.remove('invalid');
				};
			}
		});
	}
}

// Define rules
// 1.When error => message error
// 2. When valid => undefined

const isRequired = function (selector) {
	return {
		selector: selector,
		test: (value) => {
			return value.trim() ? undefined : 'Please enter this field';
		},
	};
};

const isNumberInteger = function (selector) {
	return {
		selector: selector,
		test: (value) => {
			const numberInt = Number(value);
			return typeof numberInt === 'number' &&
				!isNaN(numberInt) &&
				numberInt > 0 &&
				Number.isInteger(numberInt)
				? undefined
				: 'Please enter the number greater than 0 and number is integer ';
		},
	};
};

const isURL = function (selector) {
	return {
		selector: selector,
		test: (value) => {
			const reg = new RegExp('(https?://.*.(?:png|jpg|jpeg|gif|png|svg))');
			return reg.test(value) ? undefined : 'Please enter URL format is valid';
		},
	};
};

const isDecimal = function (selector) {
	return {
		selector: selector,
		test: (value) => {
			const numberDec = Number(value);
			return typeof numberDec === 'number' && !isNaN(numberDec) && numberDec > 0
				? undefined
				: 'Please enter the number greater than 0';
		},
	};
};

validator({
	form: '#form-add',
	errorSelector: '.form-message',
	rules: [
		isRequired('#name-product'),
		isRequired('#price-product'),
		isDecimal('#price-product'),
		isRequired('#quantity-product'),
		isNumberInteger('#quantity-product'),
		isRequired('#img-product'),
		isURL('#img-product'),
	],
	onSubmit: (data) => {
		if (data) {
			const formData = {
				name: data['name-product'],
				image: data['img-product'],
				price: data['price-product'],
				quantity: data['quantity-product'],
			};

			createProduct(formData, () => {
				getProducts(renderFoods);
			});
		}
	},
});

function start() {
	getProducts(renderFoods);
}
start();

async function getProducts(callback) {
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
			return callback(data);
		} else {
			throw new Error('404');
		}
	} catch (error) {
		console.error('Something went wrong ', error);
	}
}
function renderFoods(foods) {
	const productList = document.querySelector('.product-list');
	const cardProduct = foods.map(function (food) {
		return `
		<div class="card card-product card-id-${food.id}">
							<div class="card-header">
								<button class="icon-delete icon-id-${food.id}" onclick="handleDeleteProduct(${food.id})">&#9747;</button>
							</div>

							<div class="card-main">
								<img src="${food.image}" alt="default image" class="img-product" onerror = "src='./assets/icons/default-featured-image.jpg'" />
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
	});
	productList.innerHTML = cardProduct.join('');
}
async function handleDeleteProduct(id) {
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
}

async function createProduct(data, callback) {
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
}
