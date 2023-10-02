import axios from "axios";
import { toast } from "react-toastify";

type SetLoginFunction = (data: any) => void;
type SetUserStateFunction = (data: any) => void;
type RedirectFunction = (path: string) => void;

export const getResponse = async (
  setLogin: SetLoginFunction,
  setUserState: SetUserStateFunction,
  redirect: RedirectFunction
) => {
  try {
    const response = await axios.get("http://localhost:3000/isLoggedin", {
      withCredentials: true,
    });
    if (response.status === 200) {
      setUserState(response.data.loginResponse);
      setLogin(true);
    }
  } catch (error: any) {
    const code = error.request.status;
    if (code == 401) {
      toast.warning("Please login", { position: "top-center" });
      redirect("/login");
    } else toast.warning("Server down", { position: "top-center" });
  }
};
