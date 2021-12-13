const express = require("express");
const config = require('./config')
const routes = require('./routes/ApiRoutes')

const app = express()

app.use(express.json());
app.use('/Todo',routes.routes)

app.listen(config.serverConfig.port, () => { console.log(`Server is listening on ${config.serverConfig.hostURL}` ) });
