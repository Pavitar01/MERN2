import React, { useEffect, useState } from "react";
import { useAuth } from "../Auth/Index";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

const AdminRoutes = () => {
  const [auth, setAuth] = useAuth();
  const [islogin, setIslogin] = useState("");

  //we can use deafult header in axioss
  // axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const authCheck = async () => {
      const data = await axios.get(
        "http://localhost:8000/api/auth/admin-dashboard",
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data.data.islogin) {
        setIslogin(true);
      } else {
        setIslogin(false);
      }
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);


  return islogin ? (
    <Outlet />
  ) : 
   <Spinner/>
{/* <h1>Loading...</h1> */}
  
};

export default AdminRoutes;
