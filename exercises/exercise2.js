var books = [
	{
		title: 'The Design of EveryDay Things',
		img: 'http://ecx.images-amazon.com/images/I/41j2ODGkJDL._AA115_.jpg',
		author: 'Don Norman',
		alreadyRead: false,
	},
	{
		title: 'The Most Human Human',
		img: 'http://ecx.images-amazon.com/images/I/41Z56GwEv9L._AA115_.jpg',
		author: 'Brian Christian',
		alreadyRead: true,
	},
];

const bookList = document.createElement('ul');
for (let i = 0; i < books.length; i++) {
	const bookItem = document.createElement('li');
	const bookImg = document.createElement('img');
	bookImg.src = books[i].img;
	bookItem.appendChild(bookImg);
	const bookItemDes = document.createTextNode(
		books[i].title + ' by ' + books[i].author
	);
	bookItem.appendChild(bookItemDes);
	if (books[i].alreadyRead) {
		bookItem.style.color = 'red';
	}
	bookList.appendChild(bookItem);
}
document.body.appendChild(bookList);
