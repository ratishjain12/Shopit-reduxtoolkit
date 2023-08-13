import { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { UserContext } from "../UserContext";
import axios from "axios";
const Profile = () => {
  const { userInfo } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  async function fetch() {
    const res = await axios.post("http://localhost:3001/orders", {
      id: userInfo._id || userInfo.sub,
    });
    setOrders(res.data);
    console.log(res.data);
  }
  useEffect(() => {
    fetch();
  }, [orders]);

  return (
    <>
      <div className="bg-[#002147]">
        <div className="container mx-auto p-6 ">
          <div className="flex flex-col items-center justify-between max-w-md flex-wrap mx-auto">
            <Avatar
              alt={userInfo.name || userInfo.username}
              src={userInfo.picture}
              sx={{ width: 200, height: 200 }}
            />
            <div className="info flex flex-col mt-2">
              <h2 className="text-white">
                <span className="font-bold">Name: </span>
                {userInfo.name || userInfo.username}
              </h2>
              <h2 className="text-white">
                <span className="font-bold">Email: </span>
                {userInfo.email}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="orders pl-[20px] pt-[12px]">
        <h1 className="text-3xl">Orders History</h1>

        <div className="ordersList">
          {orders?.map((item) => {
            return item.products.map((product) => {
              return (
                <div
                  className="my-4 flex gap-4 shadow-sm p-4 max-w-full m-2"
                  key={product.id}
                >
                  <img src={product.image} className="max-w-[120px]" />
                  <div className="flex flex-col justify-center">
                    <p>{product.title}</p>
                    <div className="price flex gap-2">
                      <span className="font-bold">Price: </span> $
                      {product.price}
                    </div>
                    <p>
                      <span className="font-bold">Qty: </span>
                      {product.qty}
                    </p>
                  </div>
                </div>
              );
            });
          })}
        </div>
      </div>
    </>
  );
};
export default Profile;
