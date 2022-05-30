const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const connection = require("./database/database")
const session = require('express-session')
require('dotenv').config()
const loginRouter = require('./database/login');




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