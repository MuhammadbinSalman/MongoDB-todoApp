const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,  // This connects the todo to a specific user
        ref: 'User',         // This references the 'User' model
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);