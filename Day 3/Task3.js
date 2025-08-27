// Simple Student marks calculator

// Student details with marks
const student = {
  name: "Rahul Sharma",
  marks: {
    math: 85,
    physics: 78,
    chemistry: 92,
    english: 88,
    computer: 95,
  },
};

// Calculate total marks
let total = 0;
let subjects = Object.keys(student.marks);

for (let subject of subjects) {
  total += student.marks[subject];
}

// Calculate average
let average = total / subjects.length;

// Decide grade
let grade;
if (average >= 90) {
  grade = "A+";
} else if (average >= 80) {
  grade = "A";
} else if (average >= 70) {
  grade = "B";
} else if (average >= 60) {
  grade = "C";
} else {
  grade = "Fail";
}

// Print result
console.log("Student Name:", student.name);
console.log("Total Marks:", total);
console.log("Average Marks:", average);
console.log("Grade:", grade);
