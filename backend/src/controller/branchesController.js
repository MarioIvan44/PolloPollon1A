const branchesController = {};
//Importamos el schema de la colección que vamos a ocupar

import branchesModel from "../models/branches.js";

//SELECT
branchesController.getBranches = async (req, res) =>{
    const branches = await branchesModel.find()
    res.json(branches)
}

//INSERT
branchesController.createBranch = async (req, res) => {
    const {name, address, schedule, isActive} = req.body; //Pedimos todos los datos que se van a insertar
    const newBranch = new branchesModel({name, address, schedule, isActive}) //Mandamos los datos que se solicitan
    //Guardamos los datos
    await newBranch.save()
    //Si se guardan los datos enviamos un mensaje de confirmación
    res.json({message: "Branch save"})
}

//UPDATE
branchesController.updateBranch = async(req, res) => {
    const {name, address, schedule, isActive} = req.body; //Pedimos todos los datos que se van a actualizar
    await branchesModel.findByIdAndUpdate(req.params.id, { //Buscamos la rama por su id y actualizamos los datos
        name, address, schedule, isActive
    }, {new: true})

    //Si se actualizan los datos enviamos un mensaje de confirmación
    res.json({message: "Branch updated"})
}

//DELETE
branchesController.deleteBranch = async(req, res) => {
    await branchesModel.findByIdAndDelete(req.params.id) //Buscamos la rama por su id y la eliminamos
    res.json({message: "Branch deleted"})
}

export default branchesController;