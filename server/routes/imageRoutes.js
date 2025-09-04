import express from "express";
import { uploadImage, getAllImages } from "../controllers/imageController.js";

const router = express.Router();

router.post("/api/upload", uploadImage);
router.get("/api/images", getAllImages);

export default router;
