// String methods javascript

var string = 'Dang Van Tran Van Chinh!';

// Find index
console.log(string.lastIndexOf('Van', 10));
console.log(string.indexOf('Dung'));

//Cut string
console.log(string.slice(0, 4));
console.log(string.slice(-6, -1));

// Replace
console.log(string.replace('Dang', 'Nguyen'));
console.log(string.replace(/Van/g, 'Văn'));

//Convert to UpperCase
console.log(string.toUpperCase());

// Convert to Lower case
console.log(string.toLowerCase());

// Trim (removes whitespace from both sides of a string)
var myString = '   Hoc lap trinh javascript    ';
console.log(myString.trim());

// Split (A string can be converted to an array )
var languages = 'Javascript, Ruby, PHP';
console.log(languages.split(', '));

// Array methods javascript
const students = ['Hung', 'John', 'Nhi', 'Huy'];

// Array to String
console.log(students.toString());

// Join (joins all array elements into a string)
console.log(students.join(' - '));

// Pop (removes the last element from an array and print element)
console.log(students.pop());
console.log(students);

// Push (adds a new element to an array last index)
console.log(students.push('Linh', 'Tien', 'Tuan'));
console.log(students);

// Shift (removes the first element from an array and print element)
console.log(students.shift());
console.log(students);

// Unshift (adds a new element to an array first index)
console.log(students.unshift('Chien', 'Hau'));
console.log(students);

// Splicing
var languages = ['javascript', 'PHP', 'Ruby'];
languages.splice(1, 0, 'C++');
console.log(languages);
languages.splice(2, 1, 'Python', 'Java');
console.log(languages);

// Concat
var languages2 = ['Dart', 'C#'];
console.log(languages.concat(languages2));

// slicing
console.log(languages);
console.log(languages.slice(0, 1));
