require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const cors = require('cors');  // Import the CORS middleware
const userRoutes = require('./routes/userRoute')
const todoRoutes = require('./routes/todoRoute')

const app = express();
const port = 3001;
const dbURL = process.env.URL

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit process if unable to connect
    });

// Middleware to parse JSON requests
app.use(cors());
app.use("/api/", userRoutes)
app.use("/api/", todoRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
