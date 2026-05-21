//LIBRARIES 
//cloudinary
//multer
//multer-storage-cloudinary

import { v2 as cloudinary } from "cloudinary" // Cloudinary allows us to upload and manage images in the cloud, which is useful for storing banner images without having to manage our own server storage.
import multer from "multer" // Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. In this case, we will use it to handle the uploading of banner images from the frontend to the backend.
import { CloudinaryStorage } from "multer-storage-cloudinary" // CloudinaryStorage is a storage engine for Multer that allows us to directly upload files to Cloudinary, simplifying the process of handling file uploads and storage in the cloud.

import bannerModel from "../models/banners.js"

const bannersController = {}

//Get all banners
bannersController.getAllBanners = async (req, res) => {
    try {
        const banners = await bannerModel.find()
        return res.status(200).json(banners)
    }
    catch (error) {
        console.error("Error al obtener los banners:", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

//INSERT (CREATE) a new banner
bannersController.createBanner = async (req, res) => {
    try {
        //#1 Request the data
        const { title, subtitle } = req.body

        //#2 Fill the model with the data
        //What is form data?
        // Form data is the data sent from the frontend (usually a web form) to the backend. In this case, it includes the title and subtitle of the banner.
        //What is req.file?
        // req.file is an object that contains information about the uploaded file, which is provided by Multer after the file is uploaded. It includes properties such as path (the URL of the uploaded image in Cloudinary) and filename (the public ID of the uploaded image in Cloudinary).
        const newBanner = new bannerModel({
            title,
            subtitle,
            image: req.file.path, // The path of the uploaded image from Cloudinary, which is provided by Multer after the file is uploaded.
            public_id: req.file.filename // The public ID of the uploaded image from Cloudinary, which is also provided by Multer. This is useful for managing the image in Cloudinary, such as deleting it when the banner is deleted from the database.
        })

        //#3 Save the new banner in the DB
        await newBanner.save()
        return res.status(201).json({message: "Banner created successfully"})
    }
    catch (error) {
        console.error("Error al crear el banner:", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

//DELETE a banner
bannersController.deleteBanner = async (req, res) => {
    try {
        //1# Search the register to delete
        const bannerToDelete = await bannerModel.findById(req.params.id)
        
        //Delete the image from Cloudinary using the public_id stored in the DB
        await cloudinary.uploader.destroy(bannerToDelete.public_id)

        //2# Delete the register from the DB
        await bannerModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({ message: "Banner deleted successfully" })
        
    } catch (error) {
        console.error("Error al eliminar el banner:", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

//UPDATE a banner
bannersController.updateBanner = async (req, res) => {
    try {
        //1# - Request the new data
        const {title, subtitle} = req.body;

        // Identify the banner I am updating
        const bannerFound = await bannerModel.findById(req.params.id)

        const updatedData = {
            title, 
            subtitle
        }

        //If comes a image 
        if(req.file){
            //Delete the image inserted before
            await cloudinary.uploader.destroy(bannerFound.public_id)

            //Save the new image
            updatedData.image = req.file.path;
            updatedData.public_id = req.file.filename
        }

        //Save in the BD
        await bannerModel.findByIdAndUpdate(
            req.params.id,
            updatedData, 
            {new: true}
        )

        return res.status(200).json({ message: "Banner updated successfully" })
    
    } catch (error) {
        console.error("Error al actualizar el banner:", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export default bannersController;