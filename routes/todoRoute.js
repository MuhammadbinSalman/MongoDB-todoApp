const express = require('express');
const todoRoute = express.Router();
const path = require('path')
const todoController = require('../controller/todoController')
const bodyParser = require('body-parser')

todoRoute.use(bodyParser.urlencoded({ extended: false }))
todoRoute.use(bodyParser.json())


todoRoute.post('/add_todos', todoController.add_todo)
todoRoute.get('/get_todos', todoController.get_todo)
todoRoute.delete('/delete_todo/:todo_id', todoController.delete_todo)

module.exports = todoRoute;