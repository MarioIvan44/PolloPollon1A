import express from "express"
import bannersController from "../controller/bannersController.js"
import upload from "../utils/cloudinaryConfig.js"

const router = express.Router();

router.route("/")
.get(bannersController.getAllBanners)
.post(upload.single("image"), bannersController.createBanner)
//single: upload 1 image
//array: multiple files (any kind of files)


router.route("/:id")
.put(upload.single("image"), bannersController.updateBanner)
.delete(bannersController.deleteBanner);

export default router;
