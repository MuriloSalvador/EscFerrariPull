import Sequelize from "sequelize"
import connection from "./database.js"

const Pilotos = connection.define('pilotos', {
    id_piloto: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ano: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    piloto: {
        type: Sequelize.STRING,
        allowNull: true
    },
    numero: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    escuderia: {
        type: Sequelize.STRING,
        allowNull: false
    }

});
//Pilotos.sync({force: true});

export default Pilotos