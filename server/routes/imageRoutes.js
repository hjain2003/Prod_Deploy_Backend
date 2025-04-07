import express from "express";
import { uploadImage, getAllImages } from "../controllers/imageController.js";

const router = express.Router();

router.post("/upload", uploadImage);
router.get("/images", getAllImages);

export default router;
