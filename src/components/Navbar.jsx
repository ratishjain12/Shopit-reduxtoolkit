import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav-wrapper w-full bg-gray-200">
      <div className="flex container mx-auto justify-between p-2 items-center">
        <span className="logo">Cloth store</span>
        <div className="flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <span>Cart items: 0</span>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
