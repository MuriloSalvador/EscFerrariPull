const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const connection = require("./database/database")
const bcrypt = require('bcryptjs')
const passport = require('passport')
const session = require('express-session')
const adminAuth = require('./middleware/adminAuth')
const fileUpload = require('express-fileupload')
const multer = require('multer')
const nodemailer = require('nodemailer');
require('dotenv').config()





//models
const UsuarioP = require('./database/usuariosP')
const News = require("./database/news")
const Event = require("./database/envento")
const Pilotos = require("./database/pilotos")
const Calendario = require("./database/calendario")
const Usuario = require("./database/Usuario")
const Palpite = require("./database/concurso")
const rCorrida = require('./database/rPalpite')
const loginRouter = require('./database/login');
const router = require("./database/login");
const { callbackify } = require("util");
const RPalpite = require("./database/rPalpite");
const Sequelize = require("sequelize")



var msg = false
var erro = false


connection
    .authenticate()
    .then(() => {
        console.log("Conexao feita no banco de dados")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })
app.use('/favicon.ico', express.static("public/img/favicon.ico"))

app.use('/login', loginRouter)
app.set('view engine', 'ejs')

//Redis

//Sessions

app.use(session({
    secret: process.env.SECRET_SESSION,
    cookie: { maxAge: 1800000 }
}))
app.use(express.static('public'))

// Body Parser --- Sem o Body Parser a requisição não vai reconhecer json então não vai funcionar
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/env/img/conc', (req, res)=>{
    var file = req.body.novaImg
    console.log('nome do arquivo', file)
})