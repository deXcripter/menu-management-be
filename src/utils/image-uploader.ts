import { Request } from "express";
import fs from "fs";
import cloudinary from "../services/cloudinary";
import AppError from "./app-error";

const uploadImage = async (
  req: Request,
  folder: string
): Promise<string | undefined> => {
  try {
    if (!req.file) return undefined;
    const [type, ext] = req.file.mimetype.split("/");
    const filename = `${folder}-${Date.now()}`;
    const path = req.file.path;

    if (type !== "image" || !["jpg", "jpeg", "png"].includes(ext))
      return undefined;

    const image = await cloudinary.uploader.upload(path, {
      folder: folder,
      public_id: `${filename}`,
    });

    (async () => {
      fs.unlink(path, (err) => {
        err && console.log(`Error deleting image: ${err}`);
      });
    })();

    return image.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    // return new AppError(`Error uploading image: ${error}`, 400);
    return undefined;
  }
};

const deleteImage = async (folder: string, imageLink: string) => {
  const publicId = imageLink.split("/").pop()?.split(".")[0];
  if (!publicId) return;

  const fullPublicId = `${folder}/${publicId}`;
  const result = await cloudinary.uploader.destroy(fullPublicId);
  if (result.result !== "ok") console.error("Error deleting image:", result);
};

export { uploadImage, deleteImage };
