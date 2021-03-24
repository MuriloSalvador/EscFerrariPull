const Sequelize = require('sequelize')

const connection = new Sequelize('ferrariescuderia', 'root', '@Matrix22', {

    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;