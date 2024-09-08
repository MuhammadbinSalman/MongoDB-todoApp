const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3002;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit process if unable to connect
    });

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
  
});


const Student = mongoose.model('Student', StudentSchema);

app.get('/students', async (req, res) => {
    try {
        const students = await Student.find({})
        res.status(200).send(students);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/add-students', async (req, res) => {
    try {
        const students = new Student(req.body);
        await students.save();
        res.status(201).send(todo);
    } catch (error) {
        res.status(400).send(error);
    }
});