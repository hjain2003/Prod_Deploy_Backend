// app.js
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import imageRoutes from "./routes/imageRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

  
// API Routes
app.use("/", imageRoutes);

app.get("/", (req, res) => {
    res.send("🖼️ Image Upload API is running!");
  });

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
