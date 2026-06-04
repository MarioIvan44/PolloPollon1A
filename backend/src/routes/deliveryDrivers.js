import express from "express"
import deliveryDriversController from "../controller/deliveryDriversController.js"
import uploader from "../utils/cloudinaryConfig.js"

const router = express.Router()

router.route("/")
.get(deliveryDriversController.getAllDrivers)
.post(uploader.single("image"),deliveryDriversController.createDeliveryDriver)

router.route("/:id")
.put(uploader.single("image"),deliveryDriversController.updateDrivers)
.delete(deliveryDriversController.deleteDrivers)
.get(deliveryDriversController.getDriverById)

export default router;