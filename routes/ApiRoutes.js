const express = require('express');
const router = express.Router();
const controller = require('../controller/ApiController')

router.get('/getAllTasks', controller.getAllTask)
router.get('/getOneTask/:taskId', controller.getOneTask)

router.post('/createTask',controller.createTask)

router.put('/editTask/:taskId',controller.editTask)
router.put('/completeTask/:taskId',controller.completeTask)

router.delete('/deleteTask/:taskId',controller.deleteTask)

module.exports = {
    routes: router
}