const express = require("express");
const config = require('./config')
const routes = require('./routes/ApiRoutes')
const db = require('./models')

const app = express()

db.sequelize.sync();

app.use(express.json());
app.use('/Todo',routes.routes)
app.use('*',(req,res)=>{
    res.status(400).send('Invalid API')
})

app.listen(config.serverConfig.port, () => { console.log(`Server is listening on ${config.serverConfig.hostURL}` ) });
