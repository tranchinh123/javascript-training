document.body.style.fontFamily = 'Arial, sans-serif';
document.querySelector('#nickname').textContent = 'John';
document.querySelector('#favorites').textContent = 'Play football';
document.querySelector('#hometown').textContent = 'LA';

const liElements = document.querySelectorAll('li');
for (let i = 0; i < liElements.length; i++) {
	liElements[i].className = 'listitem';
}
const myPic = document.createElement('img');
myPic.src = 'http://gotocon.com/dl/jaoo_aus2008/photos/speakers/Pamela_Fox.jpg';
document.body.appendChild(myPic);
