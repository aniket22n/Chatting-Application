import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/userAtom";
import { useNavigate } from "react-router";
import useToast from "./useToast";

const useAuthentication = () => {
  const setUserState = useSetRecoilState(userState);
  const redirect = useNavigate();
  const { warningToast } = useToast();

  const isLoggedin = async () => {
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

  return isLoggedin;
};

export default useAuthentication;
