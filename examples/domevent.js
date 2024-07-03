var courses = ['HTML & CSS', 'Javascript', 'PHP', 'Java'];

function render(courses) {
	const listCourses = courses.map(function (course) {
		return `<li>${course}</li>`;
	});
	const nodeE = document.querySelector('ul');
	nodeE.innerHTML = listCourses.join('');
}
render(courses);

const boxNode = document.querySelector('.box');
console.log([boxNode]);

const headingNode = document.querySelectorAll('h1');

for (var i = 0; i < headingNode.length; i++) {
	headingNode[i].onclick = function (e) {
		console.log(e.target);
	};
}

const inputElement = document.querySelector('input[type="text"]');
// inputElement.oninput = function (e) {
// 	console.log(e.target.value);
// 	inputValue = e.target.value;
// };
inputElement.onkeyup = function (e) {
	console.log(e.which);
};

const checkboxElement = document.querySelector('input[type="checkbox"]');
checkboxElement.onchange = function (e) {
	console.log(e.target.checked);
};

const selectElement = document.querySelector('select');
selectElement.onchange = function (e) {
	console.log(e.target.value);
};

const aElement = document.querySelectorAll('a');
for (let i = 0; i < aElement.length; i++) {
	aElement[i].onclick = function (e) {
		if (!e.target.href.startsWith('http://f8.edu.vn')) {
			e.preventDefault();
		}
	};
}

document.querySelector('.hello').onclick = function () {
	console.log('Hello');
};

document.querySelector('button').onclick = function (e) {
	e.stopPropagation();
	console.log('Click me');
};
