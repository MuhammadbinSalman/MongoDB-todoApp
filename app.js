const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import the CORS middleware
const userRoutes = require('./routes/userRoute')

const app = express();
const port = 3001;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use("/api", userRoutes)

// Connect to MongoDB
const dbURL = process.env.URL
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit process if unable to connect
    });



// Define a mongoose model and schema
const Student = mongoose.model('Student', {
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

// app.post('/todos', async (req, res) => {
//     try {
//         if (typeof req.body.completed === 'string') {
//             req.body.completed = req.body.completed.toLowerCase() === 'true';
//         }
//         const todo = new Todo(req.body);
//         await todo.save();
//         res.status(200).send(todo);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

app.post('/add_student', async (req, res) => {
        console.log("here");
        console.log(JSON.stringify(req.body) + "body");
        const students = new Student(req.body);
        console.log(JSON.stringify(students) + "students");
       let student_result =  await students.save();
       console.log(JSON.stringify(student_result) + "student_result");
        res.status(200).send(students);
});

// app.get('/', async (req, res) => {
//     try {
//         console.log("get");
//         const todos = await Todo.find({});
//         res.status(200).send(todos);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

app.delete('/delete_todo/:todo_id', async (req, res) => {
    try {
        let todo_id = req.params.todo_id;
        //console.log("get");
        const todos = await Todo.findByIdAndDelete(todo_id);
        res.status(200).send("Deleted Successfully");
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/students', async (req, res) => {
    try {
        const students = await Student.find({})
        res.status(200).send(students);
    } catch (error) {
        res.status(400).send(error);
    }
});



// // Routes go here

app.listen(port, () => {
    console.log(`Server is running on port`);
});
