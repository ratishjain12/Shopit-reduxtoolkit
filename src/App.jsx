import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={`${import.meta.env.VITE_CLIENT_ID}`}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout-success" element={<CheckoutSuccess />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Provider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
