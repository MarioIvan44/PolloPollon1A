import customerModel from "../models/customer.js";

const customersController = {};

//SELECT
customersController.getCustomers = async (req, res) => {
  try {
    const customers = await customerModel.find();
    return res.status(200).json(customers);
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//DELETE
customersController.deleteCustomer = async (req, res) => {
  try {
    const deleteCustomer = await customerModel.findByIdAndDelete(req.params.id);

    if (!deleteCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ message: "Customer eliminated" });
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//UPDATE
customersController.updateCustomer = async (req, res) => {
  try {
    //Solicito los nuevos datos a actualizar
    let {
      name,
      lastName,
      birthdate,
      email,
      password,
      isVerified,
      loginAttempts,
      timeOut,
    } = req.body;

    //Validaciones
    //Sanitizar
    name = name?.trim();
    email = email?.trim();

    //validaciones del tamaño del nombre
    if (name.length < 3 || name.length > 15) {
      return res.status(400).json({ message: "Invalid name" });
    }

    if (birthdate > new Date() || birthdate < new Date("1900-01-01")) {
      return res.status(400).json({ message: "Invalid birthdate" });
    }

    //Actualizaciones
    const updateCustomer = await customerModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        lastName,
        birthdate,
        email,
        password,
        isVerified,
        loginAttempts,
        timeOut,
      },
      { new: true },
    );

    if (!updateCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ message: "Customer update" });
  } catch (error) {}
};

export default customersController;
