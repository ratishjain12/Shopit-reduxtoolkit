import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../UserContext";
const PayButton = ({ cartItems }) => {
  const { userInfo } = useContext(UserContext);
  function handlePayment() {
    if (userInfo._id) {
      axios
        .post("http://localhost:3001/create-checkout-session", {
          cartItems,
          userId: userInfo._id || userInfo.sub,
        })
        .then((res) => {
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }
  return (
    <button
      className="bg-transparent border-2  border-[#764abc] hover:bg-[#764abc] hover:text-white text-black font-bold rounded-lg py-2 text-center mt-4 flex-1 mx-2"
      onClick={handlePayment}
    >
      Checkout
    </button>
  );
};
export default PayButton;
