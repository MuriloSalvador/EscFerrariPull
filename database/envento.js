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
        allowNull: false
    },
    data: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    local: {
        type: Sequelize.STRING,
        allowNull: true
    },
    horario_init: {
        type: Sequelize.TIME,
        allowNull: true
    },
    horario_end: {
        type: Sequelize.TIME,
        allowNull: true
    },

});

//Event.sync({force: true});

module.exports = Event;
