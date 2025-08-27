// print student details from an object

// Create a student object
const student = {
  name: "Rahul Sharma",
  age: 20,
  course: "Computer Science",
  rollNo: "CS101",
  marks: {
    math: 85,
    physics: 78,
    chemistry: 92,
  },
};

// Print full object
console.log(student);

// Print individual properties
console.log("Name:", student.name);
console.log("Age:", student.age);
console.log("Course:", student.course);
console.log("Roll No:", student.rollNo);

// Print nested object values
console.log("Math Marks:", student.marks.math);
console.log("Physics Marks:", student.marks.physics);
console.log("Chemistry Marks:", student.marks.chemistry);

// Print using a loop (all keys and values)
for (let key in student) {
  console.log(`${key}: ${student[key]}`);
}
