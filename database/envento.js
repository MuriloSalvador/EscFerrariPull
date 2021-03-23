const Sequelize = require("sequelize")
const connection = require("./database")




const Event = connection.define('eventos', {
    id_evento: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    assunto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: true
    },
    data: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    local: {
        type: Sequelize.STRING,
        allowNull: false
    },
    horario_init: {
        type: Sequelize.TIME,
        allowNull: false
    },
    horario_end: {
        type: Sequelize.TIME,
        allowNull: false
    },

});

//Event.sync({force: true});

module.exports = Event;