const eventData = require('../data/ApiData')
const constant = require('../constants/ApiConstants')
const db = require('../models')
const Tasks = db.tasks;

//get all tasks
const getAllTask = async (req, res) => {
    if(Object.keys(req.query).length == 0){
        let data = await eventData.searchTask(req.query)
        res.status(data.responseCode).send({ output: data.output, message: data.message, status: data.status })    
    }
    else{
        let data = await eventData.getAllTask()
        res.status(data.responseCode).send({ output: data.output, message: data.message, status: data.status })
    }
}
//get one task by task id
const getOneTask = async (req, res) => {
    let data = await eventData.getOneTask(req.params.taskId)
    res.status(data.responseCode).send({ output: data.output, message: data.message, status: data.status })
}
//create task
const createTask = async (req, res) => {
    if (!req.body.Heading || !req.body.Body || !req.body.StartDate) {
        res.status(400).send({ message: 'Incomplete Information', status: 400 })
        return
    }
    if (req.body.Heading.length > constant.TASKS.HEADING) {
        res.status(400).send({ message: `Heading should not be more than ${constant.TASKS.HEADING} characters`, status: 400 })
        return
    }
    if (req.body.Body.length > constant.TASKS.BODY) {
        res.status(400).send({ message: `Body should not be more than ${constant.TASKS.BODY} characters`, status: 400 })
        return
    }
    let data = await eventData.createTask(req.body)
    res.status(data.status).send({ message: data.message, status: data.status })
}
//delete task
const deleteTask = async (req, res) => {
    let data = await eventData.deleteTask(req.params.taskId)
    res.send(data)
    // res.status(data.responseCode).send({ message: data.message, status: data.status })
}
//edit task
const editTask = async (req, res) => {
    if (!req.body.Heading || !req.body.Body || !req.body.StartDate || !req.body.EndDate) {
        res.status(400).send({ message: 'Incomplete Information', status: 400 })
        return
    }
    if (req.body.Heading.length > constant.TASKS.HEADING) {
        res.status(400).send({ message: `Heading should not be more than ${constant.TASKS.HEADING} characters`, status: 400 })
        return
    }
    if (req.body.Body.length > constant.TASKS.BODY) {
        res.status(400).send({ message: `Body should not be more than ${constant.TASKS.BODY} characters`, status: 400 })
        return
    }
    let data = await eventData.editTask(req.body, req.params.taskId)
    res.status(data.responseCode).send({ message: data.message, status: data.status })
}
//complete task
const completeTask = async (req, res) => {
    let data = await eventData.completeTask(req.params.taskId)
    res.status(data.responseCode).send({ message: data.message, status: data.status })
}
//search by filter
const searchTask = async (req, res) => {
    let data = await eventData.searchTask(req.query)
    res.status(data.responseCode).send({ output: data.output, message: data.message, status: data.status })
}

module.exports = {
    getAllTask,
    getOneTask,
    createTask,
    deleteTask,
    editTask,
    completeTask,
    searchTask
}