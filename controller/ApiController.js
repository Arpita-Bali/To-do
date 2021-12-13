const eventData = require('../data/ApiData')

//get all tasks
const getAllTask = async (req, res) => {
    let data = await eventData.getAllTask()
    res.status(data.responseCode).send({ output: data.output, message: data.message, status: data.status })
}
//get one task by task id
const getOneTask = async (req, res) => {
    let data = await eventData.getOneTask(req.params.taskId)
    res.status(data.responseCode).send({ output: data.output, message: data.message, status: data.status })
}
//create task
const createTask = async (req, res) => {
    let data = await eventData.createTask(req.body)
    res.status(data.status).send({ message: data.message, status: data.status })
}
//delete task
const deleteTask = async (req, res) => {
    let data = await eventData.deleteTask(req.params.taskId)
    res.status(data.responseCode).send({ message: data.message, status: data.status })
}
//edit task
const editTask = async (req, res) => {
    let data = await eventData.editTask(req.body,req.params.taskId)
    res.status(data.responseCode).send({ message: data.message, status: data.status })
}
//complete task
const completeTask = async(req,res)=>{
    let data = await eventData.completeTask(req.params.taskId)
    res.status(data.responseCode).send({ message: data.message, status: data.status })
}

module.exports = {
    getAllTask,
    getOneTask,
    createTask,
    deleteTask,
    editTask,
    completeTask
}