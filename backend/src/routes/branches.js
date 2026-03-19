import express from "express"
import branchesController from "../controller/branchesController.js";

//Router() nos ayuda a colocar los métodos que tendrá el endpoint

const router = express.Router();

//(api/branches/)
router.route("/")
.get(branchesController.getBranches)
.post(branchesController.createBranch)

//Definimos los method para el endpoint que includes un parámetro dinámico ":id". Este parámetro se utiliza para identificar un recurso específico, como un producto en este caso. Los métodos PUT y DELETE se utilizan para actualizar y eliminar un recurso específico identificado por su ID, respectivamente. 
//(api/branches/:id)
router.route("/:id")
.put(branchesController.updateBranch)
.delete(branchesController.deleteBranch)

export default router;