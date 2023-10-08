import { toast } from "react-toastify";

type ToastHook = {
  successToast: (message: string) => void;
  errorToast: (message: string) => void;
  warningToast: (message: string) => void;
  infoToast: (message: string) => void;
};

const useToast = (): ToastHook => {
  const successToast = (message: string) => {
    toast.success(message, {
      position: "top-right",
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  const errorToast = (message: string) => {
    toast.error(message, {
      position: "top-right",
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      theme: "colored",
    });
  };
  const warningToast = (message: string) => {
    toast.warning(message, {
      position: "top-right",
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      theme: "colored",
    });
  };
  const infoToast = (message: string) => {
    toast.info(message, {
      position: "top-right",
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      theme: "colored",
    });
  };

  return {
    successToast,
    errorToast,
    warningToast,
    infoToast,
  };
};

export default useToast;
