// const users = [
// 	{
// 		id: 1,
// 		name: 'HTML/CSS',
// 	},
// 	{
// 		id: 2,
// 		name: 'Javascript',
// 	},
// 	{
// 		id: 3,
// 		name: 'PHP',
// 	},
// 	{
// 		id: 4,
// 		name: 'Python',
// 	},
// ];

// const comments = [
// 	{
// 		id: 1,
// 		user_id: 1,
// 		content: 'aaaaaaa',
// 	},
// 	{
// 		id: 2,
// 		user_id: 2,
// 		content: 'bbbbbbb',
// 	},
// ];

// function getComments() {
// 	return new Promise((resolve) => {
// 		setTimeout(() => {
// 			resolve(comments);
// 		}, 1000);
// 	});
// }

// function getUserByIds(userIds) {
// 	return new Promise((resolve) => {
// 		const result = users.filter((user) => {
// 			return userIds.includes(user.id);
// 		});
// 		setTimeout(() => {
// 			resolve(result);
// 		}, 1000);
// 	});
// }

// getComments()
// 	.then((comments) => {
// 		const userIds = comments.map((comment) => comment.user_id);
// 		return getUserByIds(userIds);
// 	})
// 	.then((users) => {
// 		var commentBlock = document.querySelector('#comment-box');
// 		let string = '';
// 		comments.forEach(function (comment) {
// 			const user = users.find((user) => user.id === comment.user_id);

// 			string += `<li>${user.name}: ${comment.content}</li>`;
// 		});
// 		commentBlock.innerHTML = string;
// 	});

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

// getToDo(1)
// 	.then((data1) => {
// 		console.log(data1);
// 		return 69;
// 	})
// 	.then((data2) => {
// 		console.log(data2);
// 		return getToDo(3);
// 	})
// 	.then((data3) => console.log(data3))
// 	.catch((error) => {
// 		console.log(error);
// 	});

fetch('https://jsonplaceholder.typicode.com/todos/1')
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
	});

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
