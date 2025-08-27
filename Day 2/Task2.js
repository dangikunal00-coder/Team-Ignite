// Find highest marks from an array

// using Math.max
const marks = [85, 92, 78, 96, 88];

const highest = Math.max(...marks);

console.log("Highest Marks:", highest);

// Using a loop
const marks1 = [85, 92, 78, 96, 88];

let highest1 = marks[0]; // assume first element is highest
for (let i = 1; i < marks.length; i++) {
  if (marks[i] > highest) {
    highest = marks[i];
  }
}

console.log("Highest Marks:", highest);

// using reduce

const marks2 = [85, 92, 78, 96, 88];

const highest2 = marks.reduce((max, curr) => (curr > max ? curr : max));

console.log("Highest Marks:", highest);
