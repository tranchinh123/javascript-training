function validator(options) {
	function validate(inputElement, rule) {
		const errorElement =
			inputElement.parentElement.querySelector('.form-message');
		const errorMessage = rule.test(inputElement.value);
		if (errorMessage) {
			errorElement.innerText = errorMessage;
			inputElement.parentElement.classList.add('invalid');
		} else {
			errorElement.innerText = '';
			inputElement.parentElement.classList.remove('invalid');
		}
	}

	const formElement = document.querySelector(options.form);
	if (formElement) {
		options.rules.forEach((rule) => {
			const inputElement = formElement.querySelector(rule.selector);
			console.log(inputElement);
			if (inputElement) {
				inputElement.onblur = () => {
					validate(inputElement, rule);
				};
			}
		});
	}
}

// Define rules
// 1.When error => message error
// 2. When valid => undefined

validator.isRequired = function (selector) {
	return {
		selector: selector,
		test: (value) => {
			return value.trim() ? undefined : 'Please enter this field';
		},
	};
};

validator.isNumber = function (selector) {
	return {
		selector: selector,
		test: (value) => {
			const reg = new RegExp('^[0-9]$');
			return reg.test(value)
				? undefined
				: 'Please enter the number greater than 0';
		},
	};
};

validator.isURL = function (selector) {
	return {
		selector: selector,
		test: (value) => {
			const reg = new RegExp('(https?://.*.(?:png|jpg))');
			return reg.test(value) ? undefined : 'Please enter URL format is valid';
		},
	};
};

validator({
	form: '#form-add',
	rules: [
		validator.isRequired('#name-product'),
		// validator.isRequired('#price-product'),
		// validator.isRequired('#img-product'),
		// validator.isRequired('#quantity-product'),
		validator.isNumber('#price-product'),
		validator.isNumber('#quantity-product'),
		validator.isURL('#img-product'),
	],
});
