// String methods javascript

var string = 'Dang Van Tran Van Chinh!';

// Find index
console.log(string.lastIndexOf('Van', 8));
console.log(string.indexOf('Dung'));

//Cut string
console.log(string.slice(0, 4));
console.log(string.slice(-6, -1));

// Replace
console.log(string.replace('Dang', 'Nguyen')); // Nguyen Van Tran Van Chinh!
console.log(string.replace(/Van/g, 'Văn')); // Dang Văn Tran Văn Chinh!

//Convert to UpperCase
console.log(string.toUpperCase());

// Convert to Lower case
console.log(string.toLowerCase());

// Trim (removes whitespace from both sides of a string)
const myString = '   Hoc lap trinh javascript    ';
console.log(myString.trim()); // 'Hoc lap trinh javascript

// Split (A string can be converted to an array )
var languages = 'Javascript, Ruby, PHP';
console.log(languages.split(', '));

// Array methods javascript
const students = ['Hung', 'John', 'Nhi', 'Huy'];

// Array to String
console.log(students.toString());

// Join (joins all array elements into a string)
console.log(students.join(' - '));

// Pop (removes the last element from an array and print element)
console.log(students.pop()); // Huy
console.log(students); // ['Hung', 'John', 'Nhi']

// Push (adds a new element to an array last index)
console.log(students.push('Linh', 'Tien', 'Tuan')); // 6
console.log(students); // ['Hung', 'John', 'Nhi', 'Linh', 'Tien', 'Tuan']

// Shift (removes the first element from an array and print element)
console.log(students.shift()); //Hung
console.log(students); //['John', 'Nhi', 'Linh', 'Tien', 'Tuan']

// Unshift (adds a new element to an array first index)
console.log(students.unshift('Chien', 'Hau')); // 7
console.log(students); // ['Chien', 'Hau', 'John', 'Nhi', 'Linh', 'Tien', 'Tuan']

// Splicing
var languages = ['javascript', 'PHP', 'Ruby'];
languages.splice(1, 0, 'C++');
console.log(languages);
languages.splice(2, 1, 'Python', 'Java');
console.log(languages);

// Concat
var languages2 = ['Dart', 'C#'];
console.log(languages.concat(languages2));

// slicing
console.log(languages);
console.log(languages.slice(0, 1));

const Student = {
	name: 'blue',
	age: 16,
};

const className = 'className';
Student[className] = 'F88';
Student['gender'] = 'men';
console.log(Student);

const car = {
	brand: {
		name: 'Ford',
	},
	color: 'blue',
};
console.log(car.brand.name);
console.log(car['brand']['name']);

// function User(firstName, lastName, age) {
// 	this.firstName = firstName;
// 	this.lastName = lastName;
// 	this.age = age;
// }
// const author = new User('Chinh', 'Đặng', '22');
// const user = new User('Nhi', 'Hồ', '21');
// console.log(author);
// console.log(user);

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

function doSomethingAsync(callback) {
	setTimeout(function () {
		const result = 'Dữ liệu từ tác vụ bất đồng bộ';
		callback(result);
	}, 6000);
}

function handleResult(data) {
	console.log('Kết quả từ callback:', data);
}

doSomethingAsync(handleResult);

const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = numbers.map(function (num) {
	return num * 3;
});
console.log(doubledNumbers);

const courses = [
	{
		id: 1,
		name: 'Javascript',
		price: 200,
	},
	{
		id: 2,
		name: 'PHP',
		price: 300,
	},
	{
		id: 3,
		name: 'Ruby',
		price: 150,
	},
	{
		id: 4,
		name: 'React',
		price: 0,
	},
	{
		id: 5,
		name: 'C++',
		price: 0,
	},
	{
		id: 6,
		name: 'Ruby',
		price: 330,
	},
];
// forEach() Duyet qua cac phan tu trong mang
courses.forEach(function (course, index) {
	console.log(course, index);
});

// every() kiểm tra tất cả phần tử có thỏa mãn dieu kien (boolean)
const isFree = courses.every(function (course) {
	return course.price === 0;
});
console.log(isFree);

// some() kiem tra chi can tu 1 phan tu thỏa mãn thì trả về true
const c = courses.some(function (course) {
	return course.price === 0;
});
console.log(c);

// find() tim 1 phan tu co trong mang
const course = courses.find(function (course) {
	return course.name === 'PHP';
});
console.log(course);

// filter() tim nhieu phan tu co trong mang
const listCourse = courses.filter(function (course) {
	return course.name === 'Ruby';
});
console.log(listCourse);

const totalCoin = courses.reduce(function (a, b) {
	return a + b.price;
}, 0);
console.log(totalCoin);

var watchList = [
	{
		Title: 'Inception',
		Year: '2010',
		Rated: 'PG-13',
		Released: '16 Jul 2010',
		Runtime: '148 min',
		Genre: 'Action, Adventure, Crime',
		Director: 'Christopher Nolan',
		Writer: 'Christopher Nolan',
		Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy',
		Plot: 'A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.',
		Language: 'English, Japanese, French',
		Country: 'USA, UK',
		imdbRating: '8.8',
		imdbVotes: '1,446,708',
		imdbID: 'tt1375666',
		Type: 'movie',
	},
	{
		Title: 'Interstellar',
		Year: '2014',
		Rated: 'PG-13',
		Released: '07 Nov 2014',
		Runtime: '169 min',
		Genre: 'Adventure, Drama, Sci-Fi',
		Director: 'Christopher Nolan',
		Writer: 'Jonathan Nolan, Christopher Nolan',
		Actors: 'Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow',
		Plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
		Language: 'English',
		Country: 'USA, UK',
		imdbRating: '8.6',
		imdbVotes: '910,366',
		imdbID: 'tt0816692',
		Type: 'movie',
	},
	{
		Title: 'The Dark Knight',
		Year: '2008',
		Rated: 'PG-13',
		Released: '18 Jul 2008',
		Runtime: '152 min',
		Genre: 'Action, Adventure, Crime',
		Director: 'Christopher Nolan',
		Writer:
			'Jonathan Nolan (screenplay), Christopher Nolan (screenplay), Christopher Nolan (story), David S. Goyer (story), Bob Kane (characters)',
		Actors: 'Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine',
		Plot: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.',
		Language: 'English, Mandarin',
		Country: 'USA, UK',
		imdbRating: '9.0',
		imdbVotes: '1,652,832',
		imdbID: 'tt0468569',
		Type: 'movie',
	},
	{
		Title: 'Batman Begins',
		Year: '2005',
		Rated: 'PG-13',
		Released: '15 Jun 2005',
		Runtime: '140 min',
		Genre: 'Action, Adventure',
		Director: 'Christopher Nolan',
		Writer:
			'Bob Kane (characters), David S. Goyer (story), Christopher Nolan (screenplay), David S. Goyer (screenplay)',
		Actors: 'Christian Bale, Michael Caine, Liam Neeson, Katie Holmes',
		Plot: 'After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from the corruption that Scarecrow and the League of Shadows have cast upon it.',
		Language: 'English, Urdu, Mandarin',
		Country: 'USA, UK',
		imdbRating: '8.3',
		imdbVotes: '972,584',
		imdbID: 'tt0372784',
		Type: 'movie',
	},
	{
		Title: 'Avatar',
		Year: '2009',
		Rated: 'PG-13',
		Released: '18 Dec 2009',
		Runtime: '162 min',
		Genre: 'Action, Adventure, Fantasy',
		Director: 'James Cameron',
		Writer: 'James Cameron',
		Actors: 'Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang',
		Plot: 'A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
		Language: 'English, Spanish',
		Country: 'USA, UK',
		imdbRating: '7.9',
		imdbVotes: '876,575',
		imdbID: 'tt0499549',
		Type: 'movie',
	},
];

function calculateRating(array) {
	const listMovie = array.filter(function (movie) {
		return movie.Director === 'Christopher Nolan';
	});

	const totalImb = listMovie.reduce(function (total, movie) {
		return total + parseFloat(movie.imdbRating);
	}, 0);
	return totalImb / listMovie.length;
}
// Expected results
console.log(calculateRating(watchList)); // Output: 8.675

function arrToObj(arr) {
	return arr.reduce(function (obj, item) {
		var key = item[0];
		var value = item[1];
		obj[key] = value;

		return obj;
	}, {});
}

var arr = [
	['name', 'Sơn Đặng'],
	['age', 18],
];

console.log(arrToObj(arr)); // { name: 'Sơn Đặng', age: 18 }

// callback tao function myMap nhu ham map()
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

const numberss = [1, 2, 3];

console.log(
	numberss.myMap(function (number) {
		return number * 2;
	})
); // Output: [2, 4, 6]

console.log(
	numberss.myMap(function (number, index) {
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

// function task1() {
// 	return new Promise((resolve, reject) => {
// 		console.log('Thực hiện tác vụ 1...');
// 		setTimeout(() => {
// 			console.log('Tác vụ 1 hoàn thành');
// 			resolve();
// 		}, 2000);
// 	});
// }

// function task2() {
// 	return new Promise((resolve, reject) => {
// 		console.log('Thực hiện tác vụ 2...');
// 		setTimeout(() => {
// 			console.log('Tác vụ 2 hoàn thành');
// 			resolve();
// 		}, 3000);
// 	});
// }

// function task3() {
// 	console.log('Thực hiện tác vụ 3...');
// 	console.log('Tất cả tác vụ đã hoàn thành');
// }

// task1()
// 	.then(() => task2())
// 	.then(() => task3());

// console.log('Đang thực hiện các tác vụ...');

const users = [
	{
		id: 1,
		name: 'HTML/CSS',
	},
	{
		id: 2,
		name: 'Javascript',
	},
	{
		id: 3,
		name: 'PHP',
	},
	{
		id: 4,
		name: 'Python',
	},
];

const comments = [
	{
		id: 1,
		user_id: 1,
		content: 'aaaaaaa',
	},
	{
		id: 2,
		user_id: 2,
		content: 'bbbbbbb',
	},
];

function getComments() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(comments);
		}, 1000);
	});
}

function getUserByIds(userIds) {
	return new Promise((resolve) => {
		const result = users.filter((user) => {
			return userIds.includes(user.id);
		});
		setTimeout(() => {
			resolve(result);
		}, 1000);
	});
}

getComments()
	.then((comments) => {
		const userIds = comments.map((comment) => comment.user_id);
		return getUserByIds(userIds);
	})
	.then((users) => {
		var commentBlock = document.querySelector('#comment-box');
		let string = '';
		comments.forEach(function (comment) {
			const user = users.find((user) => user.id === comment.user_id);

			string += `<li>${user.name}: ${comment.content}</li>`;
		});
		commentBlock.innerHTML = string;
	});

function promise() {
	return new Promise((resolve) => {
		console.log('Executing promise');
		resolve('Success');
	});
}
promise().then((result) => {
	console.log('Promise resolved:', result);
});

console.log('Promise created');
