const Sequelize = require("sequelize")
const connection = require("./database")




const News = connection.define('news', {
    id_news: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    subtitulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    img:{
        type: Sequelize.BLOB,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    link:{
        type: Sequelize.STRING,
        allowNull: true
    }

});

//News.sync({force: true});

module.exports = News;