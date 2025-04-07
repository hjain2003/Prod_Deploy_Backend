import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

const imageList = []; // In-memory storage for URLs

export const uploadImage = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.files.image;
    const fileKey = `uploads/${uuidv4()}-${file.name}`;

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileKey,
      Body: file.data,
      ContentType: file.mimetype,
    };

    await s3.upload(params).promise();

    const url = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
    imageList.push({ url });

    res.status(200).json({ url });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getAllImages = (req, res) => {
  res.status(200).json(imageList);
};
