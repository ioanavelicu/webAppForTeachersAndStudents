const express = require("express");
const router = express.Router();

const Profesor = require("../dataBase/profesor");
const Activitate = require("../dataBase/activitate");
const Raspuns = require("../dataBase/raspuns");
const { where } = require("sequelize");

Activitate.hasMany(Raspuns, {foreignKey: "codActivitate"});
Activitate.belongsTo(Profesor, {foreignKey: "idProfesor"});

router.route("/getActivitati").get(async(req, res)=>{
    try{
        const activitati = await Activitate.findAll();
        res.status(200).json(activitati)
    }catch(err){
        console.warn(err);
        res.status(500).json({message:"Database not found"})
    }
});

router.route("/getActivitate/:codActivitate").get(async(req, res)=>{
    try{
        const activitate = await Activitate.findByPk(req.params.codActivitate);
            if(activitate){
                res.status(200).json(activitate);
            } else{
                res.status(404).json({message:"Not found"});
            }
    }catch(err){
        console.warn(err);
        res.status(500).json({message:"Database not found"})
    }
});

// router.route("/activitate/:id/getRaspunsuri").get(async(req, res)=>{
//     try{
//         const activitate = await Activitate.findByPk(req.params.id);
//             if(activitate){
//                 const raspunsuri = await Raspuns.findAll({where:{

//                 }});
//                 res.status(200).json(raspunsuri);
//             } else{
//                 res.status(404).json({message:"Not found"});
//             }
//         res.status(200).json(activitati)
//     }catch(err){
//         console.warn(err);
//         res.status(500).json({message:"Database not found"})
//     }
// })

router.route("/profesori/:id/addActivitate").post(async(req, res)=>{
    try{
        const profesor = await Profesor.findByPk(req.params.id);
        if(profesor){
            const activitate = new Activitate(req.body);
            activitate.idProfesor = profesor.idProfesor;
            await activitate.save();
            res.status(202).json({message:"Created"});
        } else{
            res.status(404).json({message:"Not found"});
        }
    }catch(err){
        console.warn(err);
        res.status(500).json({message:"Database not found"})
    }
})

router.route("/deleteActivitati").delete(async (req, res)=>{
    try{
        await Activitate.destroy({where:{}});
        res.status(200).json({message:"Deleted"})

    }catch(err){
        console.warn(err);
        res.status(500).json({message:"Database not found"})
    }
})

router.route("/profesor/:id/getActivitati").get(async(req, res)=>{
    try{
        const profesor = await Profesor.findByPk(req.params.id);
        if(profesor){
            const activitati = await Activitate.findAll({where:{
                idProfesor: profesor.idProfesor
            }});
            res.status(202).json(activitati);
        } else{
            res.status(404).json({message:"Not found"});
        }
    }catch(err){
        console.warn(err);
        res.status(500).json({message:"Database not found"})
    }
})

router.route("/profesor/:id/deleteActivitate/:aid").delete(async(req, res)=>{
    try{
        const profesor = await Profesor.findByPk(req.params.id);
        if(profesor){
            await Activitate.destroy({
                where:{
                    codActivitate: req.params.aid
                }
            }).then((rows)=>{
                if(rows===1){
                    res.status(200).json({message:"Activitate stearsa"});
                } else{
                    res.status(404).json({message:"Activitatea nu exista"});
                }
            }) 
        } else{
            res.status(404).json({message:"Nu exista profesorul"});
        }
    }catch(err){
        console.warn(err);
        res.status(500).json({message:"Database not found"})
    }
})

module.exports = router;