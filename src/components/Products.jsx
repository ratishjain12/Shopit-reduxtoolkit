import { useEffect, useState } from "react";
import Productcard from "./Productcard";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setProducts(json);
      });
  }, []);

  return (
    <div className=" w-[90%] mx-auto flex gap-4 flex-wrap justify-evenly items-center">
      {products.length > 0 &&
        products.map((product) => {
          return <Productcard {...product} />;
        })}
    </div>
  );
};
export default Products;
