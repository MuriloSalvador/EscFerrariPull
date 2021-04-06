const Sequelize = require("sequelize")
const connection = require("./database")




const UsuarioP = connection.define('usuariopendente',{


    //info usuario init
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false
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
        allowNull: false
    },
    celular:{
        type: Sequelize.STRING,
        allowNull: false
    },
    genero:{
        type: Sequelize.CHAR,
        allowNull: true
    },
    cpf:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    rg:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    dataNascimento:{
        type: Sequelize.DATE,
        allowNull: false
    },
    nacionalidade:{
        type: Sequelize.STRING,
        allowNull: false
    },
    //info usuario fim

    //plus init 
    camiseta:{
        type: Sequelize.STRING,
        allowNull: false
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
        allowNull: false
    },
    cv:{
        type: Sequelize.STRING,
        allowNull: false
    },
    //plus fim

    //edereco info init
    endereco:{
        type: Sequelize.STRING,
        allowNull: false
    },
    bairro:{
        type: Sequelize.STRING,
        allowNull: false
    },
    complemento:{
        type: Sequelize.STRING,
        allowNull: true
    },
    numero:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cep:{
        type: Sequelize.STRING,
        allowNull: false
    }
    //edereco info fim


    
});



//UsuarioP.sync({force: false});




module.exports = UsuarioP;