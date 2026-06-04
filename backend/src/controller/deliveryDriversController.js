import deliveryDriversModel from "../models/deliveryDrivers.js";


import { v2 as cloudinary } from "cloudinary" // Cloudinary allows us to upload and manage images in the cloud, which is useful for storing banner images without having to manage our own server storage.
import multer from "multer" // Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. In this case, we will use it to handle the uploading of banner images from the frontend to the backend.
import { CloudinaryStorage } from "multer-storage-cloudinary" // CloudinaryStorage is a storage engine for Multer that allows us to directly upload files to Cloudinary, simplifying the process of handling file uploads and storage in the cloud.


const deliveryDriversController = {};

//SELECT
deliveryDriversController.getAllDrivers = async (req, res) => {
  try {
    const drivers = await deliveryDriversModel.find();
    return res.status(200).json(drivers);
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//SELECT BY ID
deliveryDriversController.getDriverById = async (req, res) => {
  try {
    const drivers = await deliveryDriversModel.findById(req.params.id);

    if (!drivers) {
      return res.status(404).json({ message: "Delivery driver not found" });
    }

    return res.status(200).json(drivers)
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//INSERT
deliveryDriversController.createDeliveryDriver = async (req, res) => {
  try {
    //#1 - Request the data
    const { name, phone, cars, isActive } = req.body;

    //#2 - Fill the model with the data
    const newDriver = new deliveryDriversModel({
      name,
      phone,
      image: req.file.path,
      public_id: req.file.filename,
      cars,
      isActive,
    });

    //Save all in the db
    await newDriver.save();
    return res
      .status(201)
      .json({ message: "Delivery driver created successfully" });
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Eliminar
deliveryDriversController.deleteDrivers = async (req, res) => {
  try {
    //Search the delivery to delete
    const driverFound = await deliveryDriversModel.findById(req.params.id);

    //Delete the cloudinary image
    await cloudinary.uploader.destroy(driverFound.public_id);

    //Delete from the db
    const deleted = await deliveryDriversModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Delivery driver not found" });
    }

    //Return the response
    return res.status(204).json({ message: "Delivery driver deleted" });
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//UPDATE
deliveryDriversController.updateDrivers = async (req, res) => {
  try {
    //#1 Request the new data
    const {name, phone, cars, isActive} = req.body;

    //Identify the delivery driver to delete
    const driverFound = await deliveryDriversModel.findById(req.params.id);

    const updateData = {
        name, 
        phone, 
        cars,
        isActive
    }

    //if a images come in the data, we updated it
    if(req.file) {
        //Delete the old image
        await cloudinary.uploader.destroy(driverFound.public_id)

        updateData.image = req.file.path;
        updateData.public_id = req.file.filename
    }

    //Save all the new in the db
    await deliveryDriversModel.findByIdAndUpdate(
        req.params.id, 
        updateData, 
        {new: true}
    )

    return res.status(200).json({message: "Delivery Driver updated"})
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export default deliveryDriversController;
