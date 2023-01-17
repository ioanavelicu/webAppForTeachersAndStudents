//adauga descriere la activitate
//delete cascade
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routerStudent = require('./rute/studenti');
const routerRaspuns = require('./rute/raspunsuri');
const routerProfesor = require('./rute/profesori');
const routerActivitate = require('./rute/activitati');

require('dotenv').config();

const sequelize = require('./dataBase/sequelize');

require('./dataBase/student');
require('./dataBase/profesor');
require('./dataBase/activitate');
require('./dataBase/raspuns');

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', routerStudent);
app.use('/api', routerRaspuns);
app.use('/api', routerProfesor);
app.use('/api', routerActivitate);

app.use((err, req, res, next) => {
    console.warn(err)
    res.status(500).json({"EROARE": "Eroare generala"});
}) 

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), async () => {
    console.log(`Serverul ruleaza la adresa http://localhost:${app.get('port')}`);
    try {
        await sequelize.authenticate();
        console.log('Conexiune realizata cu succes');
    } catch (error) {
        console.log('Nu se poate realiza conexiunea la baza de date', err);
    }
})