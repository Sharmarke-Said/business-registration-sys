const BACKEND_URL = "http://localhost:5000";
const DEFAULT_PHOTO_PATH = `${BACKEND_URL}/img/users/default.jpg`;

export const getFullPhotoUrl = (photoName) => {
  if (!photoName || photoName === "default.jpg") {
    return DEFAULT_PHOTO_PATH;
  }
  return `${BACKEND_URL}/img/users/${photoName}`;
};
