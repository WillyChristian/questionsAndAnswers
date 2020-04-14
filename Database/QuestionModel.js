const Sequelize = require('sequelize')
const connection = require('./MysqlConnection')

const Perguntas = connection.define('user_questions',{
    title:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    description:{
        type:Sequelize.TEXT,
        allowNull: false
    }
})

Perguntas.sync({force: false}).then(()=>{})
module.exports = Perguntas