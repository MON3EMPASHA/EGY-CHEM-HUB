import { v2 as cloudinary } from "cloudinary";

let initialized = false;

export function getCloudinary() {
  if (!initialized) {
    cloudinary.config({
      cloud_name: "dzuopkvey",
      api_key: "281759528665313",
      api_secret: "dFPmQzmjR1iAb4spK-px_krJrsU",
      secure: true,
    });
    initialized = true;
  }
  return cloudinary;
}
