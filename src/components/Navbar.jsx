import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState, useEffect, useRef } from "react";
import jwtDecode from "jwt-decode";
import { UserContext } from "../UserContext";
import { useCookies } from "react-cookie";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
const Navbar = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const [navStatus, setNavStatus] = useState(false);
  const item = useSelector((state) => state.cart.data);
  const { status, setStatus, setUserInfo, userInfo } = useContext(UserContext);
  const menuRef = useRef();
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
    changeNavStatus();
  }

  function changeNavStatus() {
    setNavStatus((prev) => !prev);
  }
  async function logout() {
    if (localStorage.getItem("userData")) {
      localStorage.removeItem("userData");
    } else {
      await instance.post("/logout");
    }

    navigate("/");
    changeNavStatus();
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

    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setNavStatus(false);
      }
    };
    document.addEventListener("mousedown", handler);
  }, []);

  function navigateToProfile() {
    navigate("/profile");
    changeNavStatus();
  }
  // document.addEventListener("mousedown", closeOpenMenus);
  return (
    <>
      <div
        className="nav-wrapper w-full bg-[#764abc] text-white sticky top-0 z-50"
        ref={menuRef}
      >
        <div className="flex container mx-auto justify-between p-2 items-center">
          <Link to="/">
            <div className="">
              <span className="logo">Shopit store</span>
            </div>
          </Link>
          <div className=" hidden   md:flex md:gap-6">
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
          <div className="nav-btn md:hidden  absolute top-1 right-1 z-50">
            <button onClick={changeNavStatus}>
              {!navStatus && <MenuIcon className="text-white" />}

              {navStatus && <CloseIcon color="black" className="text-black" />}
            </button>
          </div>
          <div
            className={`mobile-nav md:hidden absolute  w-full ${
              navStatus ? "top-0  left-0" : "top-[-300px] left-0"
            } flex flex-col justify-center items-center bg-white text-[#764abc] gap-6 p-6 shadow-sm duration-100 ease-in-out`}
          >
            <Link to="/" onClick={changeNavStatus}>
              Home
            </Link>
            <Link to="/cart" onClick={changeNavStatus}>
              Cart
            </Link>
            {/* <span>
              <span className="font-bold">Cart items:</span>
              <span className="bg-black text-white rounded-full px-2 py-1 text-sm ml-1">
                {item?.length}
              </span>{" "}
            </span> */}
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
