import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "/socialApp/postImages",
    allowedFormats: ["jpeg", "png", "jpg", "JPG", "webp", "avif", "mp4", "MOV", "mov", "avi", "tif"],
    chunk_size: 7000000,
    resource_type: "auto",
  },
});

export { cloudinary, storage };
