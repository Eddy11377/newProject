const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize("homework", "eddy", "qwerty", {
    dialect: "postgres",
    host: 'localhost',
    port: "5432"
})

async function createConnection() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true })
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database: ', error);
    }
}

createConnection()

module.exports = { sequelize, DataTypes }