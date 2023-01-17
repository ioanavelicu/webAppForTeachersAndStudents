const express = require('express');
const router = express.Router();

const Student = require('../dataBase/student');
const Raspuns = require('../dataBase/raspuns');

Student.hasMany(Raspuns, {foreignKey: "idStudent"});

router.route('/getStudenti').get(async (req, res) => {
    try{
        const studenti = await Student.findAll();
        res.status(200).json(studenti);
    } catch(error) {
        res.status(500).json(error);
    }
})

router.route('/getStudent/:id').get(async (req, res) =>{
    try{
        const student = await Student.findByPk(req.params.id);
        res.status(200).json(student);
    } catch(error) {
        res.status(500).json(error);
    }
})

router.route('/getStudentMail').get(async (req, res) =>{
    try{
        const student = await Student.findOne({where:{
            mail: req.body.mail
        }});
        res.status(200).json(student);
    } catch(error) {
        res.status(500).json(error);
    }
})

router.route('/addStudent').post(async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        res.status(200).json(newStudent);
    } catch(error) {
        res.status(500).json(error);
    }
})

router.route("/deleteStudenti").delete(async (req, res)=>{
    try{
        await Student.destroy({where:{}});
        res.status(200).json({message:"Deleted"})

    }catch(err){
        console.warn(err);
        res.status(500).json({message:"Database not found"})
    }
})

module.exports = router;