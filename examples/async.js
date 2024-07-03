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
