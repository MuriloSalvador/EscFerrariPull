const Sequelize = require("sequelize")
const connection = require("./database")





const Calendario = connection.define('calendario',{
    ano:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    etapa:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    data:{
        type: Sequelize.DATE,
        allowNull: false
    },
    data_string:{
        type: Sequelize.STRING,
        allowNull: false
    },
    corrida:{
        type: Sequelize.STRING,
        allowNull: false
    },
    local:{
        type: Sequelize.STRING,
        allowNull: false
    },
    horario:{
        type: Sequelize.TIME,
        allowNull: false
    },
    situacao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    p1:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    p2:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    p3:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    p4:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    p5:{
        type: Sequelize.INTEGER,
        allowNull: true
    }

});


//Calendario.sync({force: true});

module.exports = Calendario;
