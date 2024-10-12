import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localpath) => {
  try {
    if (!localpath) return null;
    // upload the file on cloudinary
    const res = await cloudinary.uploader.upload(localpath, {
      resource_type: "auto",
    });
    // file has been successfully uploaded
      console.log("File uploaded successfully", res.url);
      fs.unlinkSync(localpath);
    return res;
  } catch (error) {
    fs.unlinkSync(localpath);
  }
};
