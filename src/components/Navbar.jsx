import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
const Navbar = () => {
  const item = useSelector((state) => state.cart.data);

  return (
    <div className="nav-wrapper w-full bg-gray-200 sticky top-0">
      <div className="flex container mx-auto justify-between p-2 items-center">
        <span className="logo">Shopit store</span>
        <div className="flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <span>
            <span className="font-bold">Cart items:</span>
            <span className="bg-black text-white rounded-full px-2 py-1 text-sm ml-1">
              {item.length}
            </span>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
