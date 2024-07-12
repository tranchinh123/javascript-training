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
	}

	// element of form need validate

	const formElement = document.querySelector(options.form);
	if (formElement) {
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

validator.isRequired = function (selector, message) {
	return {
		selector: selector,
		test: (value) => {
			return value.trim() ? undefined : message || 'Please enter this field';
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
	errorSelector: '.form-message',
	rules: [
		validator.isRequired('#name-product'),
		validator.isRequired('#price-product'),
		validator.isNumber('#price-product'),
		validator.isRequired('#quantity-product'),
		validator.isNumber('#quantity-product'),
		validator.isRequired('#img-product'),
		validator.isURL('#img-product'),
	],
});
