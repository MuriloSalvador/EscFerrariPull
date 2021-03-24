const Sequelize = require('sequelize')

const connection = new Sequelize('fesf1', 'uesc', 'Matrix22', {

    host: 'mysql743.umbler.com',
    dialect: 'mysql'
})

module.exports = connection;