const {
      find
} = require('../dummy/students.js');
const students = require('../dummy/students.js');
class StudentController {
      // Get all students
      static getAllStudents(req, res) {
            return res.status(200).json({
                  students,
                  message: "All the students",
            });
      }
      // Get a single student
      static getSingleStudent(req, res) {
            const findStudent = students.find(student => student.id === parseInt(req.params.id, 10));
            if (findStudent) {
                  return res.status(200).json({
                        student: findStudent,
                        message: "A single student record",
                  });
            }
            return res.status(404).json({
                  message: "Student record not found",
            });
      }

      static postSingleStudent(req, res) {
            let student = {};
            student.id = students[students.length - 1].id + 1;
            student.name = req.body.name;
            student.age = req.body.age;
            console.log(student)
            students.push(student)

            return res.status(200).json({
                  student,
                  message: "student added"
            })
      }

      static updateSingleStudent(req, res) {
            const findStudent = students.find(student => student.id === parseInt(req.params.id, 10));
            if (findStudent) {
                  findStudent.age = req.body.age;
                  findStudent.name = req.body.name;
                  return res.status(200).json({
                        student: findStudent,
                        message: "Updated student record",
                  });
            }
            return res.status(404).json({
                  message: "Student record not found",
            });
      }

      static deleteSingleStudent(req, res) {
            const findStudent = students.find(student => student.id === parseInt(req.params.id, 10));
            if (findStudent) {
                  // console.log(findStudent.id);
                  pos = myArray.map(function (e) {
                        return e.id;
                  }).indexOf(findStudent.id);
                  students.splice(pos, 1);
                  return res.status(200).json({
                        message: "Student record removed",
                  });
            }
            return res.status(404).json({
                  message: "Student record not found",
            });
      }


}
// export default StudentController;
module.exports = StudentController;