const {DataTypes} = require('sequelize');
const sequelize = require('./sequelize');

const Profesor = sequelize.define(
    "Professor",
    {
        idProfesor: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nume: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mail: {
            type: DataTypes.STRING,
            isEmail: true,
            allowNull: false,
            unique: true
        },
        parola: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "Professors"
    }
)

module.exports = Profesor;