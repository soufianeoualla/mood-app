import axios from "axios";

export type PickedImage = {
  uri: string;
  type?: string;
  fileSize?: number;
  fileName?: string;
};

 const uploadService = async (file: PickedImage) => {
  const formData = new FormData();

  formData.append("file", {
    uri: file.uri,
    type: file.type || "image/jpeg",
    name: file.fileName || "upload.jpg",
  } as any);

  formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET!);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to upload image");
    }

    return response.data;
  } catch (error) {
    throw new Error("Failed to upload image");
  }
};

export default uploadService;