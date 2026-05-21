/*
    Campos:
        name:
        adress:
        schedule:
        isActive:
*/

import { Schema, model } from "mongoose"

const bannerSchema = new Schema({
    title:{
        type: String
    },
    subtitle: {
        type: String
    },
    image:{ //Image Url from Cloudinary, used to display the image in the frontend
        type: String
    },
    public_id:{ //Public Id from Cloudinary, used to delete the image from Cloudinary when the banner (image) is deleted from the DB
        type: String
    }
}, {
    // timestamps: true, add automatically createdAt and updatedAt fields to the collection documents, which makes it easier to track when records were created or modified.
    timestamps: true,
    // strict: false, allows adding additional fields to the collection documents, which makes it easier to have flexibility in the data structure.
    strict: false
})

//"Banners" is the name of the collection that is saved in the DB
export default model("Banners", bannerSchema)