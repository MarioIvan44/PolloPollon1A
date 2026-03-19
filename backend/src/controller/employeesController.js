const employeeController = {}

import employeeModel from "../models/employees.js"

employeeController.getEmployees = async (req, res) => {
    const employees = await employeeModel.find();
    res.json(employees)
}

/**
 * 
 *name:
        lastName:
        salary:
        DUI:
        phone:
        email:
        password:
        idBranch:
 */
//Insertar un nuevo empleado
employeeController.createEmployee = async (req, res) => {
    //Solicitar los datos
    const {name, lastName, salay, DUI, phone, email, password, idBranch} = req.body;
    //LLenar mi modelo con estos datos que acabo de pedir
    const newEmployee = new employeeModel( {name, lastName, salay, DUI, phone, email, password, idBranch})
    //Guardo todo en la base de datos
    await newEmployee.save();

    res.json({message: "Employee saved"})
}

//Update de un empleado
employeeController.updateEmployee = async (req, res) => {
    const {name, lastName, salay, DUI, phone, email, password, idBranch} = req.body;
    await employeeModel.findByIdAndUpdate(req.params.id, {
        name, lastName, salay, DUI, phone, email, password, idBranch
    }, //new: true, es una opción que se utiliza para indicar que se desea obtener el documento actualizado después de realizar la actualización. Si se establece en true, el método findByIdAndUpdate devolverá el documento actualizado en lugar del documento original antes de la actualización. 
    {new: true})
    res.json({message: "Employee updated"})
}   

//Delete de un empleado
employeeController.deleteEmployee = async (req, res) => {
    await employeeModel.findByIdAndDelete(req.params.id)
    res.json({message: "Employee deleted"})
}

export default employeeController;