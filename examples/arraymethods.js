// Array methods javascript
const students = ['Hung', 'John', 'Nhi', 'Huy'];

// Array to String
console.log(students.toString());

// Join (joins all array elements into a string)
console.log(students.join(' - '));

// Pop (removes the last element from an array and print element)
console.log(students.pop()); // Huy
console.log(students); // ['Hung', 'John', 'Nhi']

// Push (adds a new element to an array last index)
console.log(students.push('Linh', 'Tien', 'Tuan')); // 6
console.log(students); // ['Hung', 'John', 'Nhi', 'Linh', 'Tien', 'Tuan']

// Shift (removes the first element from an array and print element)
console.log(students.shift()); //Hung
console.log(students); //['John', 'Nhi', 'Linh', 'Tien', 'Tuan']

// Unshift (adds a new element to an array first index)
console.log(students.unshift('Chien', 'Hau')); // 7
console.log(students); // ['Chien', 'Hau', 'John', 'Nhi', 'Linh', 'Tien', 'Tuan']

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
