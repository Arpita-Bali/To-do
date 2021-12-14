const sql = require('mysql2/promise')
const config = require('../config')
const db = require('../models')
const Tasks = db.tasks;
const Op = db.Sequelize.Op;


var pool = sql.createPool(config.dbConfig)

const getAllTask = async () => {
    try {
        let data = await Tasks.findAll()
            .then(res => {
                if (res) {
                    return ({ output: res, message: "Success", status: 200, responseCode: 200 });
                }
                else {
                    return ({ output: null, message: "Empty List", status: 201, responseCode: 200 })
                }
            })
            .catch(err => {
                return ({ output: null, message: "Some error occurred while retrieving data.", status: 202, responseCode: 200 });
            });
        return data
    } catch (error) {
        console.log(error)
        return ({ output: null, message: "Some technical error occured", status: 500, responseCode: 500 })
    }
}
const getOneTask = async (taskId) => {
    try {
        let data = await Tasks.findByPk(taskId)
            .then(res => {
                if (res) {
                    return ({ output: res, message: `Success`, status: 200, responseCode: 200 });
                } else {
                    return ({ output: null, message: `Cannot find task with id=${taskId}.`, status: 404, responseCode: 404 });
                }
            })
            .catch(err => {
                return ({ output: null, message: "Error retrieving task with id=" + taskId, status: 201, responseCode: 200 });
            });
        return data
    } catch (error) {
        console.log(error)
        return ({ output: null, message: "Some technical error occured", status: 500, responseCode: 500 })
    }
}
const createTask = async (data) => {
    try {
        let qry = Tasks.create(data)
            .then(res => {
                return ({ message: "New Task Created", status: 200, responseCode: 200 });
            })
            .catch(err => {
                return ({ message: "Some error occurred while creating new task.", status: 201, responseCode: 200 });
            });
        return (qry)
    } catch (error) {
        console.log(error)
        return ({ message: "Some technical error occured", status: 500, responseCode: 500 })
    }
}
const deleteTask = async (taskId) => {
    try {
        let data = Tasks.destroy({
            where: { id: taskId }
        }).then(num => {
            if (num == 1) {
                return ({ message: "Task deleted successfully!", status: 200, responseCode: 200 });
            } else {
                return ({ message: `Task not found with id=${taskId}.`, statusbar: 404, responseCode: 404 });
            }
        }).catch(err => {
            return ({ message: "Could not delete task with id=" + taskId, statusbar: 201, responseCode: 200 });
        });
        return data
    } catch (error) {
        console.log(error)
        return ({ message: "Some technical error occured", status: 500, responseCode: 500 })
    }
}
const editTask = async (data, taskId) => {
    try {
        let qry = Tasks.update(data, {
            where: { id: taskId }
        })
            .then(num => {
                if (num == 1) {
                    return ({ message: "Task updated successfully.", status: 200, responseCode: 200 });
                } else {
                    return ({ message: `Task not found with id=${taskId}`, status: 404, responseCode: 404 });
                }
            })
            .catch(err => {
                return ({ message: "Error updating Tutorial with id=" + taskId, status: 201, responseCode: 200 });
            });
        return (qry)
    } catch (error) {
        console.log(error)
        return ({ message: "Some technical error occured", status: 500, responseCode: 500 })
    }
}
const completeTask = async (taskId) => {
    try {
        let [query] = await pool.execute(`UPDATE Tasks SET IsActive = 0 WHERE ID='${taskId}'`)
        return (query.affectedRows == 0 ? { message: "No record found", status: 201, responseCode: 200 } : { message: "Task completed", status: 200, responseCode: 200 })
    } catch (error) {
        console.log(error)
        return ({ message: "Some technical error occured", status: 500, responseCode: 500 })
    }
}
const searchTask = async (data) => {
    try {
        let condition = null
        switch (true) {
            case Object.keys(data) == 'Heading': condition = { Heading: { [Op.like]: `%${data.Heading}%` } };
                break;
            case Object.keys(data) == 'Body': condition = { Body: { [Op.like]: `%${data.Body}%` } };
                break;
            case Object.keys(data) == 'StartDate': condition = { StartDate: { [Op.like]: `%${data.StartDate}%` } };
                break;
            case Object.keys(data) == 'EndDate': condition = { EndDate: { [Op.like]: `%${data.EndDate}%` } };
                break;
            default: condition = null
        }
        let qry = Tasks.findAll({ where: condition })
            .then(res => {
                if (res.length > 0) {
                    return ({ output: res, message: "Success", status: 200, responseCode: 200 })
                }
                else {
                    return ({ output: null, message: "No record found", status: 404, responseCode: 404 })
                }
            })
            .catch(err => {
                return ({ output: null, message: "Some error occurred while retrieving tasks", status: 201, responseCode: 200 });
            });
        return qry
    } catch (error) {
        console.log(error)
        return ({ output: null, message: "Some technical error occured", status: 500, responseCode: 500 })
    }
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