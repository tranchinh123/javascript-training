fetch('https://5f7c244700bd74001690a4a7.mockapi.io/products', {
	method: 'GET',
	headers: { 'content-type': 'application/json' },
})
	.then((res) => {
		if (res.ok) {
			return res.json();
		}
		// handle error
	})
	.then((data) => {
		console.log(data);
	})
	.catch((error) => {
		console.log(error);
	});
