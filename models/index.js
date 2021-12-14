const dbConfig = require("../config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.dbConfig.database, dbConfig.dbConfig.user, dbConfig.dbConfig.password, {
    host: dbConfig.dbConfig.host,
    dialect: 'mysql',
    operatorsAliases: 0,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tasks = require("./ApiModel")(sequelize, Sequelize);

module.exports = db;