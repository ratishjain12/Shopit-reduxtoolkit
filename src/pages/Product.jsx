// src/components/ProductPage.js
import React from "react";
import { add } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
const ProductPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(location.state.item);
  const handleAdd = () => {
    dispatch(add(location.state.item));
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md p-8 bg-white shadow-md rounded-lg m-3">
        <img
          src={location.state.item.image}
          className="max-w-[160px] mx-auto"
        />
        <h2 className="text-xl font-semibold mb-4 mt-2">
          {location.state.item.title}
        </h2>
        <p className="text-gray-600 mb-4">{location.state.item.description}.</p>
        <p className="text-lg font-bold mb-4">${location.state.item.price}</p>
        <button
          className="bg-[#764abc] hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handleAdd}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
