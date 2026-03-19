const reviewsController = {};
//Importamos el schema de la colección que vamos a ocupar

import reviewsModel from "../models/reviews.js";

//SELECT
reviewsController.getReviews = async (req, res) =>{
    const reviews = await reviewsModel.find()
    res.json(reviews)
}

//INSERT
reviewsController.createReviews = async (req, res) => {
    const {idEmployee, idProducts, rating, comment} = req.body; //Pedimos todos los datos que se van a insertar
    const newReview = new reviewsModel({idEmployee, idProducts, rating, comment}) //Mandamos los datos que se solicitan
    //Guardamos los datos
    await newReview.save()
    //Si se guardan los datos enviamos un mensaje de confirmación
    res.json({message: "Review save"})
}

//UPDATE
reviewsController.updateReviews = async(req, res) => {
    const {idEmployee, idProducts, rating, comment} = req.body; //Pedimos todos los datos que se van a actualizar
    await reviewsModel.findByIdAndUpdate(req.params.id, { //Buscamos la reseña por su id y actualizamos los datos
        idEmployee, idProducts, rating, comment
    }, {new: true})

    //Si se actualizan los datos enviamos un mensaje de confirmación
    res.json({message: "Review updated"})
}

//DELETE
reviewsController.deleteReviews = async(req, res) => {
    await reviewsModel.findByIdAndDelete(req.params.id) //Buscamos la reseña por su id y la eliminamos
    res.json({message: "Review deleted"})
}

export default reviewsController;