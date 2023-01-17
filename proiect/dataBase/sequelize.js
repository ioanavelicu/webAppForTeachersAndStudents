const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './dataBase/feedback.db',
    define: {
        timestamps: false
    }
})

// sequelize.sync({force:true}).then( () => {
//     console.log('Tables created');
// })

sequelize.sync().then( () => {
    console.log('Tables created');
})

module.exports = sequelize;