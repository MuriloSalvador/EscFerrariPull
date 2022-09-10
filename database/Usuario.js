import Sequelize from "sequelize"
import connection from "./database.js"

const Usuario = connection.define('usuario',{

    //info usuario init
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    pontos:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    sobrenome:{
        type: Sequelize.STRING,
        allowNull: true
    },
    celular:{
        type: Sequelize.STRING,
        allowNull: true
    },
    genero:{
        type: Sequelize.CHAR,
        allowNull: true
    },
    cpf:{
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    rg:{
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    dataNascimento:{
        type: Sequelize.DATE,
        allowNull: true
    },
    nacionalidade:{
        type: Sequelize.STRING,
        allowNull: true
    },
    //info usuario fim

    //plus init 
    camiseta:{
        type: Sequelize.STRING,
        allowNull: true
    },
    socio1:{
        type: Sequelize.STRING,
        allowNull: true
    },
    socio2:{
        type: Sequelize.STRING,
        allowNull: true
    },
    portFerrari:{
        type: Sequelize.STRING,
        allowNull: true
    },
    cv:{
        type: Sequelize.STRING,
        allowNull: true
    },
    //plus fim

    //edereco info init
    endereco:{
        type: Sequelize.STRING,
        allowNull: true
    },
    bairro:{
        type: Sequelize.STRING,
        allowNull: true
    },
    complemento:{
        type: Sequelize.STRING,
        allowNull: true
    },
    numero:{
        type: Sequelize.INTEGER,
        allowNull: true
    },
    cep:{
        type: Sequelize.STRING,
        allowNull: true
    }
    //edereco info fim
});

//Usuario.sync({force: true});

export default Usuario