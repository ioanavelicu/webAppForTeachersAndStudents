const express = require('express')
const router = express.Router();

const Raspuns = require('../dataBase/raspuns');
const Student = require('../dataBase/student');
const Activitate = require('../dataBase/activitate');

Raspuns.belongsTo(Activitate, { foreignKey: "codActivitate" });
Raspuns.belongsTo(Student, {foreignKey: "idStudent"});

router.route('/getRaspunsuri').get(async (req, res) => {
    try {
        const raspunsuri = await Raspuns.findAll();
        res.status(200).json(raspunsuri);
    } catch(error) {
        res.status(500).json(error);
    }
})

router.route('/getRaspunsuri/:idStudent').get(async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.idStudent);
        if (student) {
            const raspunsuri = await Raspuns.findAll({where:{
                idStudent:student.idStudent
            }});
            res.status(200).json(raspunsuri);
        } else {
            res.status(404).json({ error: `Studentul cu id ${req.params.idStudent} nu exista` });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

router.route('/addRaspuns/:idStudent/:codActivitate').post(async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.idStudent);
        const activitate = await Activitate.findByPk(req.params.codActivitate);
        if (student) {
            if (activitate) {
                const newRaspuns = new Raspuns(req.body);
                newRaspuns.idStudent = student.idStudent;
                newRaspuns.codActivitate = activitate.codActivitate;
                await newRaspuns.save();
                res.status(200).json({ "Mesaj": "Raspuns creat" })
            } else {
                res.status(404).json(`Activitatea cu codul ${req.params.codActivitate} nu exista`);
            }
        } else {
            res.status(404).json(`Studentul cu id ${req.params.idStudent} nu exista`);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.route("/activitate/:id/getRaspunsuri").get(async(req, res)=>{
    try{
        const activitate = await Activitate.findByPk(req.params.id);
            if(activitate){
                const raspunsuri = await Raspuns.findAll({where:{
                    codActivitate: activitate.codActivitate
                }});
                res.status(200).json(raspunsuri);
            } else{
                res.status(404).json({message:"Not found"});
            }
    }catch(err){
        console.warn(err);
        res.status(500).json({message:"Database not found"})
    }
})

module.exports = router;