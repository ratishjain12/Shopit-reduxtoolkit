import { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { UserContext } from "../UserContext";
import axios from "axios";
const Profile = () => {
  const { userInfo } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  console.log(userInfo);
  useEffect(() => {
    axios
      .post("http://localhost:3001/orders", {
        id: userInfo._id || userInfo.sub,
      })
      .then((res) => {
        setOrders(res.data);
        console.log(orders);
      });
  }, []);

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
          {orders.length > 0 &&
            orders.map((item) => {
              <img src={item.products[0].image} />;
            })}
        </div>
      </div>
    </>
  );
};
export default Profile;
