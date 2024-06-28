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
// The forEach() method calls a function for each element in an array.
courses.forEach(function (course, index) {
	console.log(course, index);
});

// every() check if all elements satisfy the condition return boolean
const isFree = courses.every(function (course) {
	return course.price === 0;
});
console.log(isFree);

// some() checking only if a element is satisfied, it returns true
const c = courses.some(function (course) {
	return course.price === 0;
});
console.log(c);

// find() Find a element in the array
const course = courses.find(function (course) {
	return course.name === 'PHP';
});
console.log(course);

// filter() Find a lot of elements in the array
const listCourse = courses.filter(function (course) {
	return course.name === 'Ruby';
});
console.log(listCourse);
//
const totalCoin = courses.reduce(function (a, b) {
	return a + b.price;
}, 0);
console.log(totalCoin);
