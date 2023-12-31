import { TypeOptions, toast } from "react-toastify";

export const notify = (type: TypeOptions, message: string) =>
  toast(message, {
    type,
    theme: "dark",
    position: "bottom-right",
    autoClose: 1000,
  });
