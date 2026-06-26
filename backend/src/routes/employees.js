import express from "express";
import employeesController from "../controller/employeesController.js";
// Importamos el middleware de autenticación
import { validateAuthCookie } from "../middlewares/authMiddleware.js";

const router = express.Router();

// (api/employees/)
router.route("/")
  // Permitimos que admin y customer vean los empleados (puedes quitar "customer" si es información privada)
  .get(validateAuthCookie(["admin", "customer"]), employeesController.getEmployees)
  // Solo admin puede crear empleados
  .post(validateAuthCookie(["admin"]), employeesController.createEmployee);

// (api/employees/:id)
router.route("/:id")
  // Solo admin puede actualizar o eliminar empleados por su ID
  .put(validateAuthCookie(["admin"]), employeesController.updateEmployee)
  .delete(validateAuthCookie(["admin"]), employeesController.deleteEmployee);

export default router;

/**
 * Obtener empleado por nombre (Si decides activarlo en el futuro, recuerda protegerlo)
 * router.route("/name/:name")
 * .get(validateAuthCookie(["admin", "customer"]), employeesController.getEmployeeByName)
 */