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

app.use('/login', loginRouter)
app.set('view engine', 'ejs')

//Redis

//Sessions

app.use(session({
    secret: "$$%%123+-/QualQuerCoisa",
    cookie: { maxAge: 7200000 }
}))
app.use(express.static('public'))

// Body Parser --- Sem o Body Parser a requisição não vai reconhecer json então não vai funcionar
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

console.log(process.env.MYSQL_LOCAL)

app.get("/", (req, res) => {

    // var etapa = 1

    // RPalpite.findOne({where: {id: etapa}}).then(rpalpite =>{
    //     var rp1 = rpalpite.rp1
    //     var rp2 = rpalpite.rp2
    //     var rp3 = rpalpite.rp3
    //     var rp4 = rpalpite.rp4
    //     var rp5 = rpalpite.rp5
    //     var idUsuario = req.session.user.id
    //     Palpite.findOne({where: {idUsuario: idUsuario}}).then(calc =>{
    //         var p1 = calc.p1
    //         var p2 = calc.p2
    //         var p3 = calc.p3
    //         var p4 = calc.p4
    //         var p5 = calc.p5

    //         Usuario.findOne({where: {id: idUsuario}}).then(ponts =>{

    //         })
    //     })

    //     console.log("respostas: ", rp1, rp2, rp3, rp4, rp5)


    // })


    Calendario.findAll().then(corridas => {
        Event.findAll().then(event => {
            News.findAll().then(news => {
                if (req.session.user != undefined) {
                    res.render('index', { corridas: corridas, log: 1, user: req.session.user, event: event, news: news })
                }

                else {
                    res.render('index', { corridas: corridas, log: 0, news: news })
                }
            })




        })
    })

});


const user = "murilosbagodi@hotmail.com"
const pass = "$$%%123+-/money"

const transporter = nodemailer.createTransport({
    host: "SMTP.office365.com",
    port: "587",
    auth: { user: user, pass: pass }
})

app.post('/env', (req, res) => {
    var email = req.body.txtEmail
    var assunto = req.body.txtAssunto
    var textEmail = req.body.txtMsg

    transporter.sendMail({
        from: email,
        to: 'murilosbagodi@hotmail.com',
        replyTo: 'bagodi@globo.com',
        subject: assunto,
        text: textEmail
    }).then(() => {
        res.send('Email enviado com sucesso')
    }).catch(() => {
        res.send('Aconteceu algum erro, tente novamente mais tarde')
    })
})

app.get("/cadastro", (req, res) => {

    if (msg == true) {
        msg = false
        res.render("cadastro", {
            msg: "Cadastro realizado com sucesso!", log: 0
        })
    } else if (erro == true) {
        erro = false
        res.render("cadastro", {
            msg: "ERRO", log: 0
        })
    } else {
        res.render("cadastro", {
            msg: "", log: 0
        })
    }



})

app.post('/admin/cadastraEvento', adminAuth, (req, res) => {
    var titulo = req.body.titulo
    var assunto = req.body.assunto
    var desc = req.body.descEvento
    var data = req.body.data
    var local = req.body.local
    var HorarioInit = req.body.horarioInit
    var HorarioEnd = req.body.horarioEnd




    Event.findAll().then(evento => {
        if (data != evento.data) {
            Event.create({
                titulo: titulo,
                assunto: assunto,
                descricao: desc,
                data: data,
                local: local,
                horario_init: HorarioInit,
                horario_end: HorarioEnd,
            }).then(() => {
                res.redirect("/admin")
            })
        }
    })



})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/img/upload/novidades")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

app.post("/admin/addImage", upload.single("imgNews"), (req, res) => {
    res.send("arquivo enviado, Continue o cadastro da Novidade")
})

app.post("/admin/cadastraNoticia", adminAuth, (req, res) => {
    var titulo = req.body.tituloNews
    var subtitulo = req.body.subTitle
    var desc = req.body.descNews
    var img = req.body.imgNews
    var link = req.body.link



    News.findAll().then(news => {
        if (titulo != news.titulo) {
            News.create({
                titulo: titulo,
                subtitulo: subtitulo,
                descricao: desc,
                img: img,
                link: link
            }).then(() => {
                res.redirect('/admin')
            })
        }
    })
})



app.get("/admin/editPilots/:id", adminAuth, (req, res) => {

    var id = req.params.id

    Pilotos.findByPk(id).then(piloto => {
        if (piloto != undefined) {

        } else {
            res.redirect("/admin")
        }
    }).catch(erro => {
        res.redirect("/admin/editPilots")
    })
})

// tentar usar a rota do botão para passar infos

app.post("/admin/deletarPiloto", adminAuth, (req, res) => {
    var id = req.body.idPiloto
    msg == false

    if (id != undefined) {
        if (!isNaN(id)) {
            Pilotos.destroy({
                where: {
                    id_piloto: id
                }
            }).then(() => {
                msg == true
                res.redirect("/admin")
            })
        } else {
            res.send("erro Id Invalido")
        }
    }
})

app.post('/admin/deletarNews', adminAuth, (req, res) => {
    var id = req.body.idNews

    if (id != undefined) {
        if (!isNaN(id)) {
            News.destroy({
                where: {
                    id_news: id
                }
            }).then(() => {
                res.redirect("/admin")
            })
        } else {
            res.send("erro Id Invalido")
        }
    }
})

app.post("/admin/deletarEvento", adminAuth, (req, res) => {
    var id = req.body.idEvento

    if (id != undefined) {
        if (!isNaN(id)) {
            Event.destroy({
                where: {
                    id_evento: id
                }
            }).then(() => {
                msg == true
                res.redirect("/admin")
            })
        } else {
            res.redirect('/')
        }
    }
})

app.post("/admin/update", adminAuth, (req, res) => {
    var id = req.body.id_piloto
    var numero = req.body.n_piloto
    var esc = req.body.esc_piloto
    var nome = req.body.nome_piloto


    Pilotos.update({ escuderia: esc, numero: numero, piloto: nome }, {
        where: {
            id_piloto: id
        }
    }).then(() => {
        res.redirect("/admin")
    })
})
app.post('/admin/updatecalendar', adminAuth, (req, res) => {
    var etapa = req.body.etapa
    var data = req.body.data_string
    var corrida = req.body.corrida
    var horario = req.body.horario
    var situacao = req.body.situacao


    Calendario.update({ data_string: data, corrida: corrida, horario: horario, situacao: situacao }, {
        where: {
            etapa: etapa
        }
    }).then(() => {
        res.redirect("/admin")
    })

})


app.post("/admin/addPiloto", adminAuth, (req, res) => {
    var ano = req.body.anoPiloto
    var nPiloto = req.body.numPiloto
    var nome = req.body.nomePiloto
    var esc = req.body.escPiloto
    msg == false

    Pilotos.findOne({ where: { numero: nPiloto } }).then(npilotos => {
        if (npilotos == undefined) {
            Pilotos.create({
                ano: ano,
                piloto: nome,
                numero: nPiloto,
                escuderia: esc
            }).then(() => {
                res.redirect("/admin")
            })
        }
    })
})






app.get("/admin", adminAuth, (req, res) => {
    msg == false
    Pilotos.findAll().then(pilots => {
        Usuario.findAll().then(users => {
            Calendario.findAll().then(calendar => {
                Event.findAll().then(evento => {
                    News.findAll().then(news => {
                        async function siduhfuis9() {
                            const solta = await Palpite.findAll({
                                attributes: ['idUsuario', [Sequelize.fn('sum', Sequelize.col('pontos1')), 'total']],
                                group: ['idUsuario'],
                                raw: true,
                                order: Sequelize.literal('total desc')
                            })
                            console.log(solta)
                            solta.forEach(solta => {
                                solta.idUsuario
                                console.log("id: ", solta.idUsuario, "total de pontos: ", solta.total)
                                Usuario.update({ pontos: solta.total }, {

                                    where: {
                                        id: solta.idUsuario

                                    }
                                })
                            });

                            res.render("admin/admin", {
                                pilots: pilots, msg: "", adm: req.session.user, log: 1, user: req.session.user, users: users, calendar: calendar,
                                evento: evento, news: news, cont: 1
                            });
                        }

                        console.log(siduhfuis9())

                    })

                })

            })

        })


    })

})

app.get("/leaderboard", adminAuth, (req, res) => {
    Usuario.findAll().then(usr => {
        async function orderPoits() {
            const usLead = await Usuario.findAll({
                attributes: ['id', 'nome', 'sobrenome', 'pontos'],
                raw: true,
                order: [['pontos', 'DESC']]
            })
            console.log(usLead)
            res.render("leaderboard", { usr: usr, log: 1, user: req.session.user, cont: 1, leader: usLead })
        }



        console.log(orderPoits())



    })

})

app.get("/users", adminAuth, (req, res) => {
    Palpite.findAll({ where: { idUsuario: req.session.user.id } }).then(palpites => {
        res.render("users/index", { palpites: palpites, log: 1, user: req.session.user, cont: 1 });

    })

})

app.get("/concurso", adminAuth, (req, res) => {
    Pilotos.findAll().then(pilots => {
        Calendario.findAll().then(calendar => {
            RPalpite.findAll().then(result => {
                res.render("concurso", { pilots: pilots, nome: req.session.user, log: 1, user: req.session.user, calendar: calendar, msg: '', result: result })
            })

        })

    })

})

app.get("/session", (req, res) => {
    req.session.treinamento = "Formação Node.JS"
    req.session.ano = "2021"
    req.session.email = "email@email.com"
    req.session.user = {
        username: "jose",
        email: "jose@email.com",
        id: "1"
    }
    res.send("Sessão Gerada")
})

app.get("/read", (req, res) => {
    res.json({
        treinamento: req.session.treinamento,
        ano: req.session.ano,
        email: req.session.email,
        user: req.session.user,
        nome: req.session.nome

    })
})

var etapaP = 0
app.post("/salvarPalpite", adminAuth, (req, res) => {

    var p1 = req.body.p1
    var p2 = req.body.p2
    var p3 = req.body.p3
    var p4 = req.body.p4
    var p5 = req.body.p5

    var idUsuario = req.session.user.id
    etapaP = req.body.etapaP
    var idCorrida = 1
    var total = 0
    var pontos = 0


    Palpite.findOne({ where: { idUsuario: idUsuario } }).then(iduser => {
        if (etapaP == 1) {
            Palpite.create({
                idUsuario: idUsuario,
                p1: p1,
                p2: p2,
                p3: p3,
                p4: p4,
                p5: p5,
                etapa: etapaP,
                idCorrida: idCorrida,
                Pontos: pontos,
                Total: total
            }).then(() => {
                res.redirect("/users");
            }).catch(() => {
                console.log(erro)
            })

        }

        else if (etapaP != iduser.etapa) {
            Palpite.create({
                idUsuario: idUsuario,
                p1: p1,
                p2: p2,
                p3: p3,
                p4: p4,
                p5: p5,
                etapa: etapaP,
                idCorrida: idCorrida,
                Pontos: pontos,
                Total: total
            }).then(() => {
                res.redirect("/users");
            }).catch(() => {
                console.log(erro)
            })

        } else {
            res.redirect('/users')
        }
    })
});





app.post("/cadastrarUsuario", (req, res) => {
    var email = req.body.email;
    var senha = bcrypt.hashSync(req.body.senha);
    var nome = req.body.nome;
    var sobrenome = req.body.sobrenome;
    // var gender = req.body.gender;
    // var tamanho = req.body.tamanho;
    // var nacionalidade = req.body.nacionalidade;
    // var nascimentoDate = req.body.nascimentoDate;
    // var rg = req.body.rg;
    // var cpf = req.body.cpf;
    // var endereco = req.body.endereco;
    // var bairro = req.body.bairro;
    // var numero = req.body.numero;
    // var complemento = req.body.complemento;
    // var cep = req.body.cep;
    // var telefone = req.body.telefone;
    // var prop = req.body.prop;
    // var socio1 = req.body.socio1;
    // var socio2 = req.body.socio2;
    // var cv = req.body.cv

    Usuario.findOne({ where: { email: email } }).then(user => {
        if (user == undefined) {
            Usuario.create({
                email: email,
                senha: senha,
                nome: nome,
                sobrenome: sobrenome,
                // genero: gender,
                // camiseta: tamanho,
                // nacionalidade: nacionalidade,
                // dataNascimento: nascimentoDate,
                // rg: rg,
                // cpf: cpf,
                // endereco: endereco,
                // bairro: bairro,
                // numero: numero,
                // complemento: complemento,
                // cep: cep,
                // celular: telefone,
                // portFerrari: prop,
                // socio1: socio1,
                // socio2: socio2,
                // cv: cv

            }).then(() => {
                msg = true
                res.redirect("/")

            }).catch(() => {
                erro = true
                res.redirect("/cadastro")
                res.render("cadastro", {
                    msg: "Cadastro não realizado, Tente novamente mais tarde", log: 0
                })
            })
        } else {
            res.redirect("/cadastro")
        }
    })



});

app.post("/auth", (req, res) => {
    var email = req.body.email
    var senha = req.body.senha
    async function log() {
        await Usuario.findOne({ where: { email: email } }).then(user => {
            if (user.senha == null) {
                var senhaBurra = bcrypt.hashSync(req.body.senha);


                Usuario.update({ senha: senhaBurra }, {
                    where: {
                        email: email
                    }
                })
            }
            else if (user != undefined) {
                var correct = bcrypt.compareSync(senha, user.senha)
                if (correct) {
                    req.session.user = {
                        id: user.id,
                        email: user.email,
                        nome: user.nome,
                        sobrenome: user.sobrenome,
                        pontos: user.pontos
                    }

                    res.redirect("/concurso")


                } else {
                    res.send("Erro Tente novamente mais tarde")

                }
            } else {
                res.redirect("/")
            }
        })
    }
    return (log())
})


var auxTotal
Usuario.findAll().then(usCal => {

    usCal.forEach(calculoT => {
        auxTotal = calculoT.pontos
        t = auxTotal

        console.log("id: ", calculoT.id, "pontos acumulados: ", auxTotal)

    })
})

app.post("/cadastraresultado", adminAuth, (req, res) => {
    var idU = req.session.user.id
    var rp1 = req.body.rp1
    var rp2 = req.body.rp2
    var rp3 = req.body.rp3
    var rp4 = req.body.rp4
    var rp5 = req.body.rp5
    var etapaR = req.body.etapa
    var total = auxTotal
    console.log("total do us: ", total)


    rCorrida.create({
        id_Usuario: idU,
        rp1: rp1,
        rp2: rp2,
        rp3: rp3,
        rp4: rp4,
        rp5: rp5,
        etapa: etapaR


    }).then(() => {
        msg = true
        res.redirect("/concurso")

    }).catch(() => {
        erro = true
        res.redirect("/concurso")
    })

    Palpite.findAll({ where: { etapa: etapaR } }).then(calc => {
        res.render("calc/index", { calc: calc, log: 1 })
        var idUser = 0
        var p1 = 0
        var p2 = 0
        var p3 = 0
        var p4 = 0
        var p5 = 0






        calc.forEach(calcu => {

            idUser = calcu.idUsuario
            p1 = calcu.p1
            p2 = calcu.p2
            p3 = calcu.p3
            p4 = calcu.p4
            p5 = calcu.p5
            etapa = calcu.etapa
            console.log("etapa do palpite: ", etapa)
            console.log("etapa do resultado: ", etapaR)
            pontosDeEtapa = 0

            if (etapa == etapaR) {
                if (p1 == rp1) {
                    pontosDeEtapa = pontosDeEtapa + 10
                }

                if (p2 == rp2) {
                    pontosDeEtapa = pontosDeEtapa + 10
                }

                if (p3 == rp3) {
                    pontosDeEtapa = pontosDeEtapa + 10
                }

                if (p4 == rp4) {
                    pontosDeEtapa = pontosDeEtapa + 10
                }

                if (p5 == rp5) {
                    pontosDeEtapa = pontosDeEtapa + 10
                }

                if (pontosDeEtapa == 50) {
                    pontosDeEtapa = pontosDeEtapa + 25
                }
            }

            console.log('total de pontos por etapa: ', pontosDeEtapa, 'do id: ', idUser)
            //insert into
            if (etapaR == 1) {
                Palpite.update({ pontos1: pontosDeEtapa }, {

                    where: {
                        etapa: etapaR, idUsuario: idUser
                    }
                })
            }

            Palpite.update({ pontos1: pontosDeEtapa }, {

                where: {
                    etapa: etapaR, idUsuario: idUser
                }
            })
            console.log("pontos totais pontos 2: ", total)
            Palpite.update({ pontos2: total }, {

                where: {
                    etapa: etapaR,
                    idUsuario: idUser
                }
            })


            console.log('total de pontos enviados: ', total, ' para ', idUser)
            var to = pontosDeEtapa + total
            console.log(to)




            // async function siduhfuis9() {
            //     const solta = await Palpite.findAll({
            //         attributes: ['idUsuario', [Sequelize.fn('sum', Sequelize.col('pontos1')), 'total']],
            //         group: ['idUsuario'],
            //         raw: true,
            //         order: Sequelize.literal('total desc')
            //     })
            //     console.log(solta)
            //     solta.forEach(solta => {
            //         solta.idUsuario
            //         console.log("id: ", solta.idUsuario, "total de pontos: ", solta.total)
            //         Usuario.update({ pontos: solta.total }, {

            //             where: {
            //                 id: solta.idUsuario

            //             }
            //         })
            //     });
            // }

            // console.log(siduhfuis9())

            console.log(idUser, p1, p2, p3, p4, p5, pontosDeEtapa)
        });


    })

    // async function siduhfuis9() {
    //     const solta = await Palpite.findAll({
    //         attributes: ['idUsuario', [Sequelize.fn('sum', Sequelize.col('pontos1')), 'total']],
    //         group: ['idUsuario'],
    //         raw: true,
    //         order: Sequelize.literal('total desc')

    //     })
    //     console.log(solta)
    // }

    // console.log(siduhfuis9)










});
//ideia 1 - lista, array


app.get("/calc", (req, res) => {


})

// async function siduhfuis9() { const solta = await Palpite.findAll({
//     attributes: ['idUsuario', [Sequelize.fn('sum', Sequelize.col('pontos1')), 'total']],
//     group : ['idUsuario'],
//     raw: true,
//     order: Sequelize.literal('total desc')
//   })
//   console.log(solta)
//   solta.forEach(solta => {
//       solta.idUsuario
//       console.log("id: ",solta.idUsuario,"total de pontos: ", solta.total)
//       Usuario.update({ pontos: solta.total }, {

//         where: {
//             id: solta.idUsuario
//         }

//     })
//   });

// }

// console.log(siduhfuis9())



app.get("/logout", (req, res) => {
    req.session.user = undefined
    res.redirect("/")
})



app.listen(3000, () => {
    console.log("App rodando")
})


