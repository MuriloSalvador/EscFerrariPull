import Sequelize from "sequelize"
import connection from "./database.js"
import Calendario from "./calendario.js"
import Usuario from "./Usuario.js"
import RPalpite from "./rPalpite.js"

const Palpite = connection.define('palpite',{
    idUsuario:{
        type: Sequelize.INTEGER,
        allowNull: true,
        
    },
    p1:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    p2:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    p3:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    p4:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    p5:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    etapa:{
        type: Sequelize.STRING,
        allowNull: true
    },
    idCorrida:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    pontos1:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    pontos2:{
        type: Sequelize.INTEGER,
        allowNull: true
    }

});




Calendario.hasMany(Palpite);
Palpite.belongsTo(Calendario);

Palpite.belongsTo(Usuario);
Usuario.hasMany(Palpite);

Palpite.belongsTo(RPalpite);
RPalpite.hasMany(Palpite);


//Palpite.sync({force: true});

export default Palpite