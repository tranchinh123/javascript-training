// Des
const array = [1, 2, 3, 4, 5];
const [, , c, ...rest] = array;
console.log(c);
console.log(rest);

const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const array3 = [...array1, ...array2];
console.log(array3);

function logger(...rest) {
	// Rest
	for (let i = 0; i < rest.length; i++) console.log(rest[i]);
}
logger(...array3); // Spread

const object1 = {
	name: 'John',
};

const object2 = {
	age: 25,
};

const object3 = {
	...object1,
	...object2,
};
console.log(object3);

console.log(document);
console.log(2);
