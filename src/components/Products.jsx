import { useEffect, useState } from "react";
import Productcard from "./Productcard";
import { useNavigate } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setProducts(json);
      });
  }, []);

  function navigateHandler(product) {
    navigate("/product", { state: { item: product } });
  }
  return (
    <div className=" w-[90%] mx-auto flex gap-4 flex-wrap justify-evenly items-center ">
      {products.length > 0 &&
        products.map((product) => {
          return (
            <div
              className="cursor-pointer"
              onClick={() => navigateHandler(product)}
            >
              <Productcard key={product.id} {...product} />
            </div>
          );
        })}
    </div>
  );
};
export default Products;
