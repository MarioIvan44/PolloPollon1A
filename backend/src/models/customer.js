/*
    Campos:
        name:
        lastName:
        birthdate:
        email:
        password:
        isVerified:
        loginAttempts:
        timeOut:
*/

import { Schema, model } from "mongoose"

const customersSchema = new Schema({
    name:{
        type: String
    },
    lastName:{
        type: String
    },
    birthdate:{
        type: Date
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    isVerified: {
        type: Boolean
    },
    loginAttempts:{
        type: Number
    },
    timeOut:{
        type: Date
    }
}, {
    // timestamps: true, agrega automáticamente campos de fecha de creación y actualización a los documentos de la colección, lo que facilita el seguimiento de cuándo se crearon o modificaron los registros.
    timestamps: true,
    // strict: false, permite agregar campos adicionales a los documentos de la colección, lo que facilita la flexibilidad en la estructura de los datos.
    strict: false
})

//"Customers" es el nombre de la colección que se guarda en la DB
export default model("Customers", customersSchema)