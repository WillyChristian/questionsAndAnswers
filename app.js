const express = require('express')
const app = express()
const bodyparser = require("body-parser")
const connect = require('./Database/MysqlConnection')
const perguntaModel = require('./Database/QuestionModel')
const responstaModel = require('./Database/AnswerModel')

// CONFIGURATION
app.set("view engine", 'ejs')
app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

// CONECTION WITH LOCALHOST 
connect.authenticate()
    .then( ()=> console.log('Logado com Sucesso'))
    .catch( err => console.log(`Erro de conexão: ${err}`))

// ROUTES
//main page
app.get('/', (req, res) => {
    perguntaModel.findAll({
        raw: true,
        order:[
            ['id', 'DESC']
        ]
    })
    .then( response =>{
        res.render("index", {
            questions: response
        })

    })
    .catch( err => console.log(`ERRO: ${err}`))
})

//page where client do the question
app.get('/question', (req,res)=>{
    res.render('Question')
})

// route to the system record the question on DB
app.post('/quest', (req,res)=>{
    var title = req.body.title;
    var description = req.body.description;
    console.log(title, description)
    perguntaModel.create({
        title: title,
        description: description
    })
    .then(res.redirect('/'))
    .catch( err => console.log(`ERRO: ${err}`))
})
//Route to questions's details
app.get('/question/:id', (req,res)=>{
    var id = req.params.id;
    perguntaModel.findOne({where: {id}})
    .then( response =>{
        if(response !== undefined){
            responstaModel.findAll({where: {perguntaId:response.id}})
            .then(answer => {
                console.log(answer)
                res.render('Details.ejs',{
                    answer,
                    response
                })
            })
        }else{
            res.render('Error.ejs')
        }
    })
    .catch(err => console.log(`ERRO: ${err}`))
})
//Route to register an answer
app.post('/answer', (req, res)=>{
    var description = req.body.answer;
    var perguntaId = req.body.perguntaId;
    responstaModel.create({
        description,
        perguntaId
    }).then( () => {
        res.redirect(`/question/${perguntaId}`)
    }).catch( err => console.log( `ERROR: ${err}`))
})

// SERVER 
app.listen(3000, ()=>{console.log('PORT: 3000')})