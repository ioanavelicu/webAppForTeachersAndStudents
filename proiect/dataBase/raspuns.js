const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Raspuns = sequelize.define(
    "Response", 
    {
        codRaspuns: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tipFeedback: {
            type: DataTypes.STRING,
            allowNull: false
        },
        moment: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    },
    {
        tableName: "Responses"
    }
)

module.exports = Raspuns;