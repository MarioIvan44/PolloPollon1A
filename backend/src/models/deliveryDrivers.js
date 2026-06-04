/*
    fields:
        name:
        phone:
        image:
        cars: {
            brand
            model
            plate
        }
        isActive:
*/


import { Schema, model } from "mongoose"

const deliveryDriversSchema = new Schema({
    name:{
        type: String
    },
    phone:{
        type: String
    },
    image:{
        type: String
    },
    public_id:{
        type: String
    },
    cars:[{
        brand: {
            type: String
        },
        model: {
            type: String 
        },
        plate: {
            type: String
        }
    }],
    isActive: {
        type: Boolean
    }
}, {
    // timestamps: true, agrega automáticamente campos de fecha de creación y actualización a los documentos de la colección, lo que facilita el seguimiento de cuándo se crearon o modificaron los registros.
    timestamps: true,
    // strict: false, permite agregar campos adicionales a los documentos de la colección, lo que facilita la flexibilidad en la estructura de los datos.
    strict: false
})

//"deliveryDrivers" es el nombre de la colección que se guarda en la DB
export default model("deliveryDrivers", deliveryDriversSchema)