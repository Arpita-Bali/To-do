const sql = require('mysql2/promise')
const config = require('../config')

var pool = sql.createPool(config.dbConfig)

const getAllTask = async () => {
    try {
        let [data] = await pool.execute(`SELECT * FROM Tasks`);
        return (data.length == 0 ? { output: null, message: "Empty List", status: 201, responseCode: 200 } : { output: data, message: "Success", status: 200, responseCode: 200 })
    } catch (error) {
        console.log(error)
        return ({ output: null, message: "Some technical error occured", status: 500, responseCode: 500 })
    }
}
const getOneTask = async (taskId) => {
    try {
        let [data] = await pool.execute(`SELECT * FROM Tasks where ID = '${taskId}'`);
        return (data.length == 0 ? { output: null, message: "No record found", status: 400, responseCode: 400 } : { output: data, message: "Success", status: 200, responseCode: 200 })
    } catch (error) {
        console.log(error)
        return ({ output: null, message: "Some technical error occured", status: 500, responseCode: 500 })
    }
}
const createTask = async (data) => {
    try {
        let qry = await pool.query(`INSERT INTO Tasks(Heading,Body,StartDate,EndDate) VALUES ('${data.heading}','${data.body}','${data.startDate}','${data.endDate}')`).then(
            rows => {
                return ({ message: "New Task Created", status: 200, responseCode: 200 })
            }, err => {
                return ({ message: err.message, status: 400, responseCode: 400 })
            }
        )
        return (qry)
    } catch (error) {
        console.log(error)
        return ({ message: "Some technical error occured", status: 500, responseCode: 500 })
    }
}
const deleteTask = async (taskId) => {
    try {
        let [data] = await pool.execute(`DELETE FROM Tasks WHERE ID = '${taskId}'`);
        return (data.affectedRows == 0 ? { message: "No record found", status: 400, responseCode: 400 } : { message: "Success", status: 200, responseCode: 200 })
    } catch (error) {
        console.log(error)
        return ({ message: "Some technical error occured", status: 500, responseCode: 500 })
    }
}
const editTask = async (data,taskId) => {
    try {
        let qry = await pool.query(`UPDATE Tasks SET Heading = '${data.heading}',Body='${data.body}',StartDate='${data.startDate}',EndDate='${data.endDate}' WHERE ID='${taskId}'`).then(
            rows => {
                return ({ message: "Task Updated", status: 200, responseCode: 200 })
            }, err => {
                return ({ message: err.message, status: 400, responseCode: 400 })
            }
        )
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

module.exports = {
    getAllTask,
    getOneTask,
    createTask,
    deleteTask,
    editTask,
    completeTask
}