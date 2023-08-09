import { ToastContainer, toast } from "react-toastify";
import { add } from "../store/cartSlice";
import { useDispatch } from "react-redux";
const Productcard = ({
  category,
  description,
  id,
  image,
  price,
  rating,
  title,
}) => {
  const dispatch = useDispatch();

  function handleAdd() {
    dispatch(add({ id, category, description, image, price, rating, title }));
    toast.success("Product Added to Cart", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  return (
    <div className="w-[20rem] sm:h-[26rem] sm:w-[24rem] md:[w-45vw] lg:w-[16rem] md:h-[22rem]  rounded-lg shadow-md flex flex-col justify-between ">
      <img
        className=" w-full object-contain h-[20vh] "
        src={image}
        alt="image"
      />
      <div className="p-3 flex-end">
        <h4 className="font-semibold tracking-tight text-gray-700 line-clamp-2">
          {title}
        </h4>
        <p className="mb-1 leading-normal line-clamp-2">{description}</p>
        <p className="mb-1 leading-normal line-clamp-2 mt-2">
          <span className="font-bold">Price: </span>${price}
        </p>
        <button
          onClick={handleAdd}
          className="w-full px-4 py-2 text-sm text-white bg-[#764abc] rounded shadow"
        >
          Add to cart
        </button>
      </div>
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
export default Productcard;
