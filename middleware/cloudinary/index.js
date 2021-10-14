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
    folder: "/socialApp/userProfilePics",
    allowedFormats: ["jpeg", "png", "jpg", "JPG", "webp"],
  },
});
const postStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "postBlogAppImages",
    allowedFormats: ["jpeg", "png", "jpg", "JPG", "webp"],
  },
});

export { cloudinary, storage, postStorage };
