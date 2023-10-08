import axios from "axios";

type SetUserStateFunction = (data: any) => void;
type RedirectFunction = (path: string) => void;
type WarningToast = (message: string) => void;

export const isLoggedin = async (
  setUserState: SetUserStateFunction,
  redirect: RedirectFunction,
  warningToast: WarningToast
) => {
  try {
    const response = await axios.get("http://localhost:3000/isLoggedin", {
      withCredentials: true,
    });
    if (response.status === 200) {
      setUserState({ isLoggedin: true, info: response.data.response });
    }
  } catch (error: any) {
    const code = error.request.status;
    if (code == 401) {
      warningToast("Please login");
    } else {
      warningToast("Server down");
    }
    redirect("/login");
  }
};
