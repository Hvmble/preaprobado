const Sequelize = require('sequelize')
const db = new Sequelize('preapro', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = db