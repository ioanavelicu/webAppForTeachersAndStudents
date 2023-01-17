const {DataTypes} = require('sequelize');
const sequelize = require('./sequelize');

const Activitate = sequelize.define(
    "Activity",
    {  
        codActivitate: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descriere:{
            type: DataTypes.STRING,
            allowNull: false
        },
        start: {
            //type: DataTypes.DATE,
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        stop: {
            type: "TIMESTAMP",
            allowNull: false
        }
    }, 
    {
        tableName: "Activities"
    }
)

module.exports = Activitate;