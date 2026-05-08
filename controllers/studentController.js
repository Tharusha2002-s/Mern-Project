import Student from '../models/student.js';

export function getAllUsers(req, res){
    student.find().then((students) => {
        res.json(students)
    })
}

export function createUser(req, res){
    console.log(req.body)

    const student = new Student(req.body)
    student.save().then(() => {
        res.json({ message: 'Student saved successfully!' })
    })
}

export function updateUser(req, res){
    const studentId = req.params.id;
    console.log(`Updating student with ID: ${studentId}`);
    console.log(req.body);
    res.json({ message: `Student with ID ${studentId} updated successfully!` })
}

export function deleteUser(req, res){
    
    res.json({ message: `Student with ID ${studentId} deleted successfully!` })
}

