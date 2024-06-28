const car = {
	brand: {
		name: 'Ford',
	},
	color: 'blue',
};
console.log(car.brand.name);
console.log(car['brand']['name']);

class Person {
	hello() {
		return 'Hello';
	}
}

class Teacher extends Person {
	hello() {
		return super.hello() + ' I am student';
	}
}

const a = new Teacher();
console.log(a);
console.log(a.hello());

function arrToObj(arr) {
	return arr.reduce(function (obj, item) {
		var key = item[0];
		var value = item[1];
		obj[key] = value;

		return obj;
	}, {});
}

var arr = [
	['name', 'Son Dang'],
	['age', 18],
];

console.log(arrToObj(arr)); // { name: 'Son Dang', age: 18 }

// callback create function myMap same as map()
Array.prototype.myMap = function (cb) {
	const myArray = [];
	for (const i in this) {
		if (this.hasOwnProperty(i)) {
			const result = cb(this[i], i);
			myArray.push(result);
		}
	}
	return myArray;
};

const numbers = [1, 2, 3];

console.log(
	numbers.myMap(function (number) {
		return number * 2;
	})
); // Output: [2, 4, 6]

console.log(
	numbers.myMap(function (number, index) {
		return number * index;
	})
); // Output: [0, 2, 6]

Array.prototype.myFilter = function (cb) {
	const output = [];
	for (const i in this) {
		if (this.hasOwnProperty(i)) {
			const result = cb(this[i], i, this);
			if (result) {
				output.push(this[i]);
			}
		}
	}
	return output;
};

const myNumbers = [1, 2, 3, 4];

console.log(
	myNumbers.myFilter(function (number) {
		return number % 2 === 0;
	})
);
Output: [2, 4];

console.log(
	myNumbers.myFilter(function (number, index) {
		return index % 2 === 0;
	})
);
Output: [1, 3];

console.log(
	myNumbers.myFilter(function (number, index, array) {
		return array.length % 2 === 0;
	})
);
Output: [1, 2, 3, 4];
