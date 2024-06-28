// String methods javascript

var string = 'Dang Van Tran Van Chinh!';

// Find index
console.log(string.lastIndexOf('Van', 8));
console.log(string.indexOf('Dung'));

//Cut string
console.log(string.slice(0, 4));
console.log(string.slice(-6, -1));

// Replace
console.log(string.replace('Dang', 'Nguyen')); // Nguyen Van Tran Van Chinh!
console.log(string.replace(/Nguyen/g, 'Dang')); // Dang Văn Tran Văn Chinh!

//Convert to UpperCase
console.log(string.toUpperCase());

// Convert to Lower case
console.log(string.toLowerCase());

// Trim (removes whitespace from both sides of a string)
const myString = '  Training Javascript   ';
console.log(myString.trim()); // 'Training Javascript'

// Split (A string can be converted to an array )
var languages = 'Javascript, Ruby, PHP';
console.log(languages.split(', '));
