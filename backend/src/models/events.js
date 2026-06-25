/*
    Campos:
        customerName:
        countPieces:
        eventDate:
*/

import { Schema, model } from "mongoose"

const eventsSchema = new Schema({
    customerName:{
        type: String
    },
    countPieces:{
        type: Number
    },
    eventDate:{
        type: Date
    }
}, {
    timestamps: true,
    strict: false
})

export default model("Events", eventsSchema)


