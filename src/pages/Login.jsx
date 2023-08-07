import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { useCookies } from "react-cookie";
export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const { setStatus } = useContext(UserContext);

  const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3001",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  function redirect() {
    if (localStorage.getItem("userData") != null || cookies.token) {
      console.log(location.state.path);
      navigate(location.state ? location.state.path : "/");
      setStatus(true);
    }
  }
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const tokens = await axios.post("http://localhost:3001/auth/google", {
        // http://localhost:3001/auth/google backend that will exchange the code
        code,
      });
      console.log(tokens);
      localStorage.setItem("userData", tokens.data.id_token);
      redirect();
    },
    flow: "auth-code",
  });

  function navigationHandler() {
    navigate(location.state ? location.state.path : "/");
  }
  async function handleLogin(e) {
    e.preventDefault();
    const res = await instance.post("/login", {
      email: email,
      password: password,
      withCredentials: true,
    });
    console.log(res.data);
    if (res.status === 400) {
      alert(res.data);
    } else {
      navigationHandler();
    }
  }

  return (
    <>
      <button onClick={navigationHandler}>
        <p className="text-2xl px-6 ">&larr;</p>
      </button>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden items-center ">
        <div className="w-[90%] md:w-[28rem] p-6 bg-white rounded-md shadow-xl lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
            Sign in
          </h1>
          <form className="mt-6">
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <a href="#" className="text-xs text-purple-600 hover:underline">
              Forget Password?
            </a>
            <div className="mt-6">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </form>
          <div className="relative flex items-center justify-center w-full mt-6 border border-t">
            <div className="absolute px-5 bg-white">Or</div>
          </div>
          <div className="flex mt-4 gap-x-2">
            <button
              type="button"
              className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
              onClick={() => googleLogin()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
            </button>
          </div>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Don't have an account?{" "}
            <button
              onClick={() =>
                navigate("/register", { state: { path: location.state.path } })
              }
              className="font-medium text-purple-600 hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
