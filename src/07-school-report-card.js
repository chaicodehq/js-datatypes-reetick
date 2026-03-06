/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */
export function generateReportCard(student) {
  // Your code here
   if (typeof student !== "object" || student === null || typeof student.name !== "string" || !student.name || typeof student.marks !== "object" || student.marks === null || Object.keys(student.marks).length === 0) {
    return null;
  }

  const impossibleMarks = Object.values(student.marks).filter((key) => {
    if (key > 100 || key < 0 || typeof key !== "number") {
      return key;
    }
  })

  if (impossibleMarks.length > 0) {
    return null;
  }

  const name = student.name;
  let totalMarks = 0;
  Object.values(student.marks).forEach((mark) => {
    totalMarks = totalMarks + mark;
  })

  const subjectCount = Object.keys(student.marks).length;
  let percentage = ((totalMarks / (subjectCount * 100)) * 100);

  if (!Number.isInteger(percentage)) {
    percentage = parseFloat(percentage.toFixed(2));
  }
  let grade = "";

  if (percentage >= 90) {
    grade = "A+";
  } else if (percentage >= 80) {
    grade = "A";
  } else if (percentage >= 70) {
    grade = "B";
  } else if (percentage >= 60) {
    grade = "C";
  } else if (percentage >= 40) {
    grade = "D";
  } else {
    grade = "F";
  }

  let highestSubject = "";
  let highestMarks = 0;
  let lowestSubject = "";
  let lowestMarks = 100;

  Object.entries(student.marks).forEach((key) => {
    let current = Math.max(key[1], highestMarks);

    if (key[1] === current) {
      highestMarks = current;
      highestSubject = key[0];
    } else {
      highestMarks = current;
    }
  })

  Object.entries(student.marks).forEach((key) => {
    let current = Math.min(key[1], lowestMarks);

    if (key[1] === current) {
      lowestMarks = current;
      lowestSubject = key[0];
    } else {
      lowestMarks = current;
    }
  })

  let passedSubjects = [];
  Object.entries(student.marks).filter((key) => {
    if (key[1] >= 40) {
      passedSubjects.push(key[0]);
      return key[0];
    }
  })
  
  let failedSubjects = [];
  Object.entries(student.marks).filter((key) => {
    if (key[1] < 40) {
      failedSubjects.push(key[0]);
      return key[0];
    }
  })

  return {
    name,
    totalMarks,
    percentage,
    grade,
    highestSubject,
    lowestSubject,
    passedSubjects,
    failedSubjects,
    subjectCount
  }

}
