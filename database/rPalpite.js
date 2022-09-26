import Sequelize from "sequelize"
import connection from "./database.js"

const RPalpite = connection.define('rplapite',{
    id_Usuario:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    rp1:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    rp2:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    rp3:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    rp4:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    rp5:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    etapa:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

//RPalpite.sync({force: false}).then(() =>{})
// RPalpite.sync({force: true});

export default RPalpite
