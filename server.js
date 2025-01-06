const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

let tasks = []; // Array to store tasks temporarily

// POST endpoint to add a new task
app.post('/tasks', (req, res) => {
    const { title, mobile } = req.body;

    // Validate title and mobile number
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ message: 'Task title is required and should be a string.' });
    }

    const mobileRegex = /^[6-9]\d{9}$/; // Mobile number validation: starts with 6-9 and 10 digits
    if (!mobileRegex.test(mobile)) {
        return res.status(400).json({ message: 'Invalid mobile number. It should be 10 digits and start with 6, 7, 8, or 9.' });
    }

    // Add the task to the tasks array
    const newTask = { title: title.trim(), mobile: mobile.trim() };
    tasks.push(newTask);

    return res.status(201).json(newTask); // Return the newly added task
});

// GET endpoint to retrieve tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
