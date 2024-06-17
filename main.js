// String methods javascript

var string = "Dang Van Tran Van Chinh!";

// Find index
console.log(string.lastIndexOf("Van", 10));
console.log(string.indexOf("Dung"));

//Cut string
console.log(string.slice(0, 4));
console.log(string.slice(-6, -1));

// Replace
console.log(string.replace("Dang", "Nguyen"));
console.log(string.replace(/Van/g, "Văn"));

//Convert to UpperCase
console.log(string.toUpperCase());

// Convert to Lower case
console.log(string.toLowerCase());

// Trim (removes whitespace from both sides of a string)
var myString = "   Hoc lap trinh javascript    ";
console.log(myString.trim());

// Split (A string can be converted to an array )
var languages = "Javascript, Ruby, PHP";
console.log(languages.split(", "));

// Array methods javascript
const students = ["Hung", "John", "Nhi", "Huy"];

// Array to String
console.log(students.toString());

// Join (joins all array elements into a string)
console.log(students.join(" - "));

// Pop (removes the last element from an array and print element)
console.log(students.pop());
console.log(students);
