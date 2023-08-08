import { useSelector, useDispatch } from "react-redux";
import { remove, add } from "../store/cartSlice";
import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useCookies } from "react-cookie";
import axios from "axios";
import PayButton from "./PayButton";

const Cart = () => {
  const products = useSelector((state) => state.cart.data);
  const { status } = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie] = useCookies(["token"]);
  const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3001",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  function verify() {
    if (cookies.token) {
      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    if (!status && !localStorage.getItem("userData") && !verify()) {
      alert("Please login");
      navigate("/login", { state: { path: location.pathname } });
      return;
    }
  }, []);

  function handleRemove(id) {
    dispatch(remove(id));
  }
  function handleAdd(product) {
    dispatch(add(product));
  }

  function calcTotalCost() {
    let tc = 0;
    products.forEach((items) => {
      tc += items.price * items.qty;
    });
    return tc;
  }

  return (
    <div className="mt-3">
      <h3 className="text-center text-4xl underline">Cart</h3>
      <div className="cartWrapper container max-w-[800px] mx-auto">
        {products.length === 0 && (
          <span className=" block text-center mt-40 text-4xl">
            No items in cart
          </span>
        )}
        {products.map((product) => (
          <div key={product.id} className="cartCard border-b-2">
            <img src={product.image} alt="" className="h-[80px]" />
            <h5 className="text-sm mr-2 ml-1 text-center">{product.title}</h5>
            <h5 className="text-sm mr-2">${product.price}</h5>
            <h5 className="text-sm mr-2">Qty: {product.qty}</h5>
            <div className="flex flex-col">
              <button
                className="bg-[#764abc] py-2 px-1 text-white rounded-lg mb-1"
                onClick={() => handleAdd(product)}
              >
                +
              </button>
              <button
                className="bg-[#764abc] py-2 px-3 text-white rounded-lg mb-1"
                onClick={() => handleRemove(product.id)}
              >
                -
              </button>
            </div>
          </div>
        ))}
        {products.length > 0 && (
          <div className="flex flex-col">
            <div className="btn mx-2 text-center mt-12">
              Cart total: ${calcTotalCost().toFixed(2)}
            </div>
            <PayButton cartItems={products} />
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
