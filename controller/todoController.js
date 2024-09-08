const Todo = require('../model/TodoSchema')


const add_todo = async(req, res) => {
    const userId = req.session.userId;
    console.log(userId, "userId haha");
    try {
        if (typeof req.body.completed === 'string') {
            req.body.completed = req.body.completed.toLowerCase() === 'true';
        }
        const todo = new Todo(req.body);
        await todo.save();
        res.status(200).send(todo);
    } catch (error) {
        res.status(400).send(error);
    }
}
const get_todo = async(req, res) => {
    try {
        console.log("get");
        const todos = await Todo.find({});
        res.status(200).send(todos);
    } catch (error) {
        res.status(400).send(error);
    }
};
const delete_todo = async(req, res) => {
    try {
        let todo_id = req.params.todo_id;
        //console.log("get");
        const todos = await Todo.findByIdAndDelete(todo_id);
        res.status(200).send("Deleted Successfully");
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    add_todo,
    get_todo,
    delete_todo,
}