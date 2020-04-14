const Sequelize = require('sequelize')
const connection = require('./MysqlConnection')

const Answer = connection.define('user_answers', {
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Answer.sync({ force: false }).then(() => { })
module.exports = Answer