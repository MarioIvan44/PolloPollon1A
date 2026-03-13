const productsController = {};
//Importamos el schema de la colección que vamos a ocupar

import productsModel from "../models/products.js";

//SELECT
productsController.getProducts = async (req, res) =>{
    const products = await productsModel.find()
    res.json(products)
}

//INSERT
productsController.createProducts = async (req, res) => {
    const {name, description, price, stock} = req.body; //Pedimos todos los datos que se van a insertar
    const newProduct = new productsModel({name, description, price, stock}) //Mandamos los datos que se solicitan
    //Guardamos los datos
    await newProduct.save()
    //Si se guardan los datos enviamos un mensaje de confirmación
    res.json({message: "Product save"})
}

//UPDATE
productsController.updateProducts = async(req, res) => {
    const {name, description, price, stock} = req.body; //Pedimos todos los datos que se van a actualizar
    await productsModel.findByIdAndUpdate(req.params.id, { //Buscamos el producto por su id y actualizamos los datos
        name, description, price, stock
    }, {new: true})

    //Si se actualizan los datos enviamos un mensaje de confirmación
    res.json({message: "Product updated"})
}

//DELETE
productsController.deleteProducts = async(req, res) => {
    await productsModel.findByIdAndDelete(req.params.id) //Buscamos el producto por su id y lo eliminamos
    res.json({message: "Product deleted"})
}

export default productsController;