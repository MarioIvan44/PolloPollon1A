import express from "express"
import customersController from "../controller/customersController.js"

//Usamos router() de la libreria de express que 
//define los métodos HTTP (get, post, put, delete)

const router = express.Router();

router.route("/")
.get(customersController.getCustomers)

router.route("/:id")
.put(customersController.updateCustomer)
.delete(customersController.deleteCustomer)

export default router;
