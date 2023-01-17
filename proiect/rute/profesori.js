const express = require("express");
const router = express.Router();

const Profesor = require("../dataBase/profesor");
const Activitate = require("../dataBase/activitate");

Profesor.hasMany(Activitate, {foreignKey:"idProfesor"});

router.route("/getProfesori").get(async(req, res)=>{
    try{
        const profesori = await Profesor.findAll();
        res.status(200).json(profesori)
    }catch(err){
        console.warn(err);
        res.status(500).json({message:"Database not found"})
    }
});

router.route("/getProfesor/:id").get(async(req, res)=>{
    try{
        const profesor = await Profesor.findByPk(req.params.id);
        if(profesor){
            res.status(200).json(profesor);
        } else{
            res.status(404).json({message:"Not found"});
        }
    }catch(err){
        console.warn(err);
        res.status(500).json({message:"Database not found"})
    }
});

router.route("/addProfesor").post(async(req, res)=>{
    try{
        await Profesor.create(req.body);
        res.status(201).json({message:"Creat"});
    }catch(err){
        console.warn(err);
        res.status(500).json({message:"Database not found"})
    }
})

router.route("/deleteProfesori").delete(async (req, res)=>{
    try{
        await Profesor.destroy({where:{}});
        res.status(200).json({message:"Deleted"})

    }catch(err){
        console.warn(err);
        res.status(500).json({message:"Database not found"})
    }
})

// router.route("/profesor/:id/getActivitati").get(async(req, res)=>{
//     try{
//         const profesor = await Profesor.findByPk(req.params.id);
//         if(profesor){
//             const activitati = await Profesor.getActivitates();
//             res.status(202).json(activitati);
//         } else{
//             res.status(404).json({message:"Not found"});
//         }
//     }catch(err){
//         console.warn(err);
//         res.status(500).json({message:"Database not found"})
//     }
// })

// router.route("/profesor/:id/addActivitati").post(async(req, res)=>{
//     try{
//         const profesor = await Profesor.findByPk(req.params.id);
//         if(profesor){
//             let activitate = req.body;
//             activitate.ProfesorIdProfesor=profesor.idProfesor;
//             await Activitate.create(activitate);
//             res.status(202).json({message:"Created"});
//         } else{
//             res.status(404).json({message:"Not found"});
//         }
//     }catch(err){
//         console.warn(err);
//         res.status(500).json({message:"Database not found"})
//     }
// })

// router.route("/profesor/:id/deleteActivitate/:aid").delete(async(req, res)=>{
//     try{
//         const profesor = await Profesor.findByPk(req.params.id);
//         if(profesor){
//             await Activitate.destroy({
//                 where:{
//                     codActivitate: req.params.aid
//                 }
//             }).then((rows)=>{
//                 if(rows===1){
//                     res.status(200).json({message:"Activitate stearsa"});
//                 } else{
//                     res.status(404).json({message:"Activitatea nu exista"});
//                 }
//             }) 
//         } else{
//             res.status(404).json({message:"Nu exista profesorul"});
//         }
//     }catch(err){
//         console.warn(err);
//         res.status(500).json({message:"Database not found"})
//     }
// })

module.exports = router;