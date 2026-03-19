/*
    Campos:
        name:
        adress:
        schedule:
        isActive:
*/

import { Schema, model } from "mongoose"

const branchesSchema = new Schema({
    name:{
        type: String
    },
    address: {
        type: String
    },
    schedule:{
        type: String
    },
    isActive:{
        type: Boolean
    }
}, {
    // timestamps: true, agrega automáticamente campos de fecha de creación y actualización a los documentos de la colección, lo que facilita el seguimiento de cuándo se crearon o modificaron los registros.
    timestamps: true,
    // strict: false, permite agregar campos adicionales a los documentos de la colección, lo que facilita la flexibilidad en la estructura de los datos.
    strict: false
})

//"Branches" es el nombre de la colección que se guarda en la DB
export default model("Branches", branchesSchema)