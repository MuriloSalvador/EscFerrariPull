const Sequelize = require('sequelize')

const connection = new Sequelize('ferrariescuderia', 'root', '@Matrix22', {

    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
})

module.exports = connection;