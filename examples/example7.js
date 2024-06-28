function getToDo(id) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();

		request.onreadystatechange = function () {
			if (request.readyState == 4 && request.status === 200) {
				const data = JSON.parse(request.responseText);
				resolve(data);
			}
			if (request.readyState == 4 && request.status !== 200) {
				reject('something wrongs');
			}
		};
		request.open(
			'GET',
			`https://jsonplaceholder.typicode.com/todos/${id}`,
			true
		);
		request.send();
	});
}

getToDo(1)
	.then((data1) => {
		console.log(data1);
		return getToDo(2);
	})
	.then((data2) => {
		console.log(data2);
		return getToDo(3);
	})
	.then((data3) => console.log(data3))
	.catch((error) => {
		console.log(error);
	});

//
fetch('https://jsonplaceholder.typicode.com/todos/1')
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
	});

//
const getNewTodo = async (id) => {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/todos/${id}`
	);
	const data = await response.json();
	return data;
};
getNewTodo(4).then((data) => {
	console.log('Check get data', data);
});
