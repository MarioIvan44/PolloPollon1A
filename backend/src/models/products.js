/*
    Campos:
        name:
        description:
        price:
        stock:
*/

import { Schema, model } from "mongoose"

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
    timestamps: true,
    strict: false
})

//"Products" es el nombre de la colección que se guarda en la DB
export default model("Products", productsSchema)