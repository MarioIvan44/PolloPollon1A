import express from "express"
import employeesController from "../controller/employeesController.js";

//Router() nos ayuda a colocar los métodos que tendrá el endpoint
const router = express.Router();

//(api/employees/)
router.route("/")
.get(employeesController.getEmployees)
.post(employeesController.createEmployee)

//Definimos los métodos para el endpoint que incluye un parámetro dinámico ":id". Este parámetro se utiliza para identificar un recurso específico, como un producto en este caso. Los métodos PUT y DELETE se utilizan para actualizar y eliminar un recurso específico identificado por su ID, respectivamente. 
//(api/branches/:id)
router.route("/:id")
.put(employeesController.updateEmployee)
.delete(employeesController.deleteEmployee) 

export default router; 

/**
 * Obtener empleado por nombre
 * router.route("/:name")
 *  .get(employeesController.getEmployeeByName)
 */
