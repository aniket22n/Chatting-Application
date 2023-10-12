const baseURL = import.meta.env.VITE_BASE_URL;

export const api = {
  baseURL: baseURL,
  loginURL: baseURL + "/login",
  registerURL: baseURL + "/register",
  chatHistoryURL: baseURL + "/chatHistory",
  deleteChatHistroy: baseURL + "/deleteChatHistroy",
  searchURL: baseURL + "/search",
  addUserURL: baseURL + "/addUser",
  updateImageURL: baseURL + "/updateImage",
  logoutURL: baseURL + "/logout",
  isLoggedinURL: baseURL + "/isLoggedin",
};
