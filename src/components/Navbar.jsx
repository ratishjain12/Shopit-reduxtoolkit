import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { UserContext } from "../UserContext";
import { useCookies } from "react-cookie";
import axios from "axios";
const Navbar = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const item = useSelector((state) => state.cart.data);
  const { status, setStatus, setUserInfo, userInfo } = useContext(UserContext);
  const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3001",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const navigate = useNavigate();
  const location = useLocation();

  function navigationHandler() {
    console.log(location);
    navigate("/login", { state: { path: location.pathname } });
  }

  async function logout() {
    if (localStorage.getItem("userData")) {
      localStorage.removeItem("userData");
    } else {
      await instance.post("/logout");
    }

    navigate("/");
    setStatus(false);
  }

  const verify = async () => {
    if (cookies.token) {
      const res = await instance.post("verify", { withCredentials: true });
      setUserInfo(res.data);
      setStatus(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userData") != null) {
      setStatus(true);
      setUserInfo(jwtDecode(localStorage.getItem("userData")));
      console.log(userInfo);
    } else {
      verify();
    }
  }, []);

  function navigateToProfile() {
    navigate("/profile");
  }

  return (
    <>
      <div className="nav-wrapper w-full bg-[#764abc] text-white sticky top-0 z-50">
        <div className="flex container mx-auto justify-between p-2 items-center">
          <Link to="/">
            <div className="">
              <span className="logo">Shopit store</span>
            </div>
          </Link>
          <div className="flex gap-6">
            <Link to="/">Home</Link>
            <Link to="/cart">Cart</Link>
            <span>
              <span className="font-bold">Cart items:</span>
              <span className="bg-black text-white rounded-full px-2 py-1 text-sm ml-1">
                {item?.length}
              </span>{" "}
            </span>
            {status ? (
              <>
                <button className="flex" onClick={navigateToProfile}>
                  {userInfo?.picture && (
                    <img
                      src={userInfo?.picture}
                      className="w-[22px] mr-2 rounded-full"
                    />
                  )}
                  {userInfo?.name ? userInfo.name : userInfo?.username}
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
