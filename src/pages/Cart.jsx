import { useSelector, useDispatch } from "react-redux";
import { remove } from "../store/cartSlice";
import { useEffect } from "react";
const Cart = () => {
  const products = useSelector((state) => state.cart.data);
  const totalCost = useSelector((state) => state.cart.totalCost);
  const dispatch = useDispatch();

  function handleRemove(id) {
    dispatch(remove(id));
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
            <h5>{product.title}</h5>
            <h5>${product.price}</h5>
            <button className="btn" onClick={() => handleRemove(product.id)}>
              Remove
            </button>
          </div>
        ))}
        {products.length > 0 && (
          <div className="btn mx-2 text-center mt-12">
            Cart total: ${totalCost.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
