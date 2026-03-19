/*
    Campos:
        idEmployee:
        idProducts:
        rating:
        comment:
*/

import mongoose, { Schema, model } from "mongoose"

const reviewsSchema = new Schema({
    idEmployee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employees"
    },
    idProducts:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    },
    rating:{
        type: Number,
        min: 1,
        max: 5
    },
    comment:{
        type: String
    }
}, {
    // timestamps: true, agrega automáticamente campos de fecha de creación y actualización a los documentos de la colección, lo que facilita el seguimiento de cuándo se crearon o modificaron los registros.
    timestamps: true,
    // strict: false, permite agregar campos adicionales a los documentos de la colección, lo que facilita la flexibilidad en la estructura de los datos.
    strict: false
})

//"Reviews" es el nombre de la colección que se guarda en la DB
export default model("Reviews", reviewsSchema)
