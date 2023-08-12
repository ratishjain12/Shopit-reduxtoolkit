import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import Lottie from "lottie-react";
import checkOut from "./checkout.json";

const CheckoutSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
    toast.success("Cart Items Cleared", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }, []);
  return (
    <div className="flex justify-center flex-col items-center">
      <Lottie animationData={checkOut} loop={false} />
      <h2 className="text-xl bg-blue-400 p-2 rounded-lg text-white">
        Checkout Success
      </h2>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  );
};
export default CheckoutSuccess;
