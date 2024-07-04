function Validator(options) {
	// hàm thực hiện validate
	const selectorRules = {};

	function validate(inputElement, rule) {
		const errorElement = inputElement.parentElement.querySelector(
			options.errorSelector
		);
		let errorMessage;
		// lấy ra các rules của selector
		const rules = selectorRules[rule.selector];
		// lặp qua từng rule và kiểm tra, nếu có lỗi thì dừng việc ktra
		for (let i = 0; i < rules.length; i++) {
			errorMessage = rules[i](inputElement.value);
			if (errorMessage) break;
		}

		if (errorMessage) {
			errorElement.textContent = errorMessage;
			inputElement.parentElement.classList.add('invalid');
		} else {
			errorElement.textContent = '';
			inputElement.parentElement.classList.remove('invalid');
		}
		return !errorMessage;
	}
	// Lấy element của form cần validate
	const formElement = document.querySelector(options.form);
	if (formElement) {
		// Khi submit form
		formElement.onsubmit = function (e) {
			e.preventDefault();
			let isFormValid = true;
			// lặp qua từng rules và validate
			options.rules.forEach((rule) => {
				const inputElement = formElement.querySelector(rule.selector);
				const isValid = validate(inputElement, rule);
				if (!isValid) {
					isFormValid = false;
				}
			});
			if (isFormValid) {
				if (typeof options.onSubmit === 'function') {
					// const enableInputs = formElement.querySelector('');
					options.onSubmit({
						
					});
				}
			}
		};

		// lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur , input,...)
		options.rules.forEach((rule) => {
			// luu lại các rules cho mỗi lượt
			if (Array.isArray(selectorRules[rule.selector])) {
				selectorRules[rule.selector].push(rule.test);
			} else {
				selectorRules[rule.selector] = [rule.test];
			}

			const inputElement = formElement.querySelector(rule.selector);
			if (inputElement) {
				// xử lý trường hợp blur khỏi input
				inputElement.onblur = function () {
					validate(inputElement, rule);
				};
				// Xử lý khi người dùng nhập vào input
				inputElement.oninput = function () {
					errorElement.textContent = '';
					inputElement.parentElement.classList.remove('invalid');
				};
			}
		});
	}
}

Validator.isRequired = function (selector) {
	return {
		selector: selector,
		test: function (value) {
			return value.trim() ? undefined : 'Please enter this field';
		},
	};
};

Validator.isEmail = function (selector) {
	return {
		selector: selector,
		test: function (value) {
			const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			return regex.test(value)
				? undefined
				: 'Please address empty or wrong format';
		},
	};
};

Validator.isMinLength = function (selector, min) {
	return {
		selector: selector,
		test: function (value) {
			return value.length >= min
				? undefined
				: `Please enter correct format, (${min} characters)`;
		},
	};
};

Validator.isConfirmed = function (selector, getConfirmValue, message) {
	return {
		selector: selector,
		test: function (value) {
			return value === getConfirmValue()
				? undefined
				: message || 'The value entered is incorrect';
		},
	};
};


const list = { [
	name: 'chinh'
	age: 18
]
}