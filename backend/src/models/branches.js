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
    timestamps: true,
    strict: false
})

//"Branches" es el nombre de la colección que se guarda en la DB
export default model("Branches", branchesSchema)