const btnElement = document.querySelector('#btn');
const textNode = document.querySelector('p');
btnElement.onclick = function () {
	textNode.style.color = 'green';
	textNode.style.fontSize = '30px';
	textNode.style.fontFamily = 'Arial, sans-serif';
};

// const formElement = document.querySelector('input[type="submit"]');
// const inputTextElements = document.querySelectorAll('input[type="text"]');
// for (let i = 0; i < inputTextElements.length; i++) {
// 	function myFunction() {
// 		const text = document.getElementById('input1').value;
// 		document.getElementById('demo').innerHTML = 'You wrote: ' + text;
// 	}
// 	// const text2 = document.querySelector('#input2').value;
// }

const btnNode = document.querySelector('#btn-color');
const p2Node = document.querySelector('#text2');
const p3Node = document.querySelector('#text3');
btnNode.onclick = function () {
	p2Node.style.background = 'red';
	p3Node.style.background = 'blue';
};
