/*
    Campos:
        name:
        description:
        price:
        stock:
*/

import mongoose, { Schema, model } from "mongoose"

const productsSchema = new Schema({
    name:{
        type: String
    },
    description: {
        type: String
    },
    price:{
        type: Number
    },
    stock:{
        type: Number
    }
}, {
    // timestamps: true, agrega automáticamente campos de fecha de creación y actualización a los documentos de la colección, lo que facilita el seguimiento de cuándo se crearon o modificaron los registros.
    timestamps: true,
    // strict: false, permite agregar campos adicionales a los documentos de la colección, lo que facilita la flexibilidad en la estructura de los datos.
    strict: false
})

//"Products" es el nombre de la colección que se guarda en la DB
export default model("Products", productsSchema)