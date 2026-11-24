
const Student = require("../studentModel");

// ---------- helpers ----------
const isValidName = (name) =>
    typeof name === "string" && name.trim().length > 0;

// age is optional, but if given it must be an integer from 0 to 120
const isValidAge = (age) =>
    age === undefined || (Number.isInteger(age) && age >= 0 && age <= 120);

// ---------- GET all students ----------
const getStudents = (req, res) => {
    res.json(Student.getAllStudents());
};

// ---------- GET single student ----------
const getStudent = (req, res) => {
    const student = Student.getStudentById(req.params.id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
};

// ---------- POST (create) ----------
const createStudent = (req, res) => {
    const { name, age } = req.body || {};

    if (!isValidName(name)) {
        return res.status(400).json({ message: "Name is required" });
    }
    if (!isValidAge(age)) {
        return res
            .status(400)
            .json({ message: "Age must be an integer between 0 and 120" });
    }

    const student = Student.addStudent({ name: name.trim(), age });
    res.status(201).json(student);
};

// ---------- PUT (replace whole student) ----------
const replaceStudent = (req, res) => {
    const { name, age } = req.body || {};

    // PUT replaces the whole resource, so name is required
    if (!isValidName(name)) {
        return res.status(400).json({ message: "Name is required" });
    }
    if (!isValidAge(age)) {
        return res
            .status(400)
            .json({ message: "Age must be an integer between 0 and 120" });
    }

    const student = Student.replaceStudent(req.params.id, {
        name: name.trim(),
        age
    });

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
};

// ---------- PATCH (update some fields) ----------
const updateStudent = (req, res) => {
    const { name, age } = req.body || {};

    if (name === undefined && age === undefined) {
        return res.status(400).json({ message: "Provide name or age to update" });
    }
    if (name !== undefined && !isValidName(name)) {
        return res.status(400).json({ message: "Invalid name" });
    }
    if (!isValidAge(age)) {
        return res
            .status(400)
            .json({ message: "Age must be an integer between 0 and 120" });
    }

    const changes = {};
    if (name !== undefined) changes.name = name.trim();
    if (age !== undefined) changes.age = age;

    const student = Student.updateStudent(req.params.id, changes);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
};

// ---------- DELETE ----------
const deleteStudent = (req, res) => {
    const student = Student.deleteStudent(req.params.id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted", data: student });
};

module.exports = {
    getStudents,
    getStudent,
    createStudent,
    replaceStudent,
    updateStudent,
    deleteStudent
};