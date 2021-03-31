const Sequelize = require('sequelize')

const connection = new Sequelize('ferrariescsp', 'uferrarisp', 'a1234567', {

    host: 'mysql743.umbler.com',
    dialect: 'mysql',
    timezone: '-03:00'
})

module.exports = connection;