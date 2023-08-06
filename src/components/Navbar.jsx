import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { UserContext } from "../UserContext";
const Navbar = () => {
  const item = useSelector((state) => state.cart.data);
  const { status, setStatus, setUserInfo, userInfo } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();

  function navigationHandler() {
    console.log(location);
    navigate("/login", { state: { path: location.pathname } });
  }

  function logout() {
    localStorage.removeItem("userData");
    navigate("/");
    setStatus(false);
  }

  useEffect(() => {
    if (localStorage.getItem("userData") != null) {
      setStatus(true);
      setUserInfo(jwtDecode(localStorage.getItem("userData")));
      console.log(userInfo);
    }
  }, []);

  return (
    <>
      <div className="nav-wrapper w-full bg-[#764abc] text-white sticky top-0">
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
            {status ? (
              <>
                <button className="flex">
                  <img
                    src={userInfo?.picture}
                    className="w-[22px] mr-2 rounded-full"
                  />
                  {userInfo.name}
                </button>
                <button onClick={logout}>Logout </button>
              </>
            ) : (
              <button onClick={navigationHandler}>Login</button>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
export default Navbar;
