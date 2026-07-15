"use server";

export const uploadToImgBB = async (formData: FormData) => {
  const file = formData.get("image") as File;
  if (!file) return null;

  const newFormData = new FormData();
  newFormData.append("image", file);

  const apiKey = process.env.IMGBB_API_KEY;

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      },
    );
    const data = await response.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error("ImgBB upload failed");
    }
  } catch (error) {
    console.error("Image upload error:", error);
    return null;
  }
};