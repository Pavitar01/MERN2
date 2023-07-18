import React, { useEffect, useState } from "react";
import { useAuth } from "../../Auth/Index";
import { Link } from "react-router-dom";
import axios from "axios";

const UserPannel = ({url}) => {
  const [auth, setAuth] = useAuth();
  const [details,setDetails]=useState([])
  useEffect(() => {
    const a = async () => {
      let val = localStorage.getItem("userAuth");
      val = JSON.parse(val);
      try {
        const data = await axios.post(
          "http://localhost:8000/api/product/get-vendor-by-id",
          { id: val.user.id }
        );
        if (data?.data?.success) {
          setDetails(data.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    a();
  }, []);

  return (
    <div className="col-4 ">
      <div
        class="card "
        style={{ width: "100%", display: "flex", alignItems: "center" }}
      >
        <img
          className="card-img-top"
          src={details.photo || "https://glplaw.com/wp-content/uploads/2021/03/4.png"}
          alt="Card image cap"
          style={{ width: "100px", height: "100px" }}
        />
        <div className="card-body">
          <h4
            className="card-title"
            style={{ textAlign: "center", width: "100%" }}
          >
            {auth.user.role === 2 ? "( Admin )" : ""}
            {auth.user.role === 1 ? "( Vendor )" : ""}
            {auth.user.role === 0 ? "( Customer )" : ""}
          </h4>
          <h6
            className="card-title"
            style={{ textAlign: "center", width: "100%" }}
          >
            {details.name}
          </h6>
          <h6
            className="card-title"
            style={{ textAlign: "center", width: "100%" }}
          >
            {details.email}
          </h6>
          <h6
            className="card-title"
            style={{ textAlign: "center", width: "100%" }}
          >
            {details.phone}
          </h6>
        </div>
      </div>
      <div
        class="btn-group-vertical card-body"
        role="group"
        aria-label="Basic outlined example"
      >
        <Link to="/user/orders">
          <button
            type="button"
            class="btn btn-outline-dark"
            style={{ width: "20rem" }}
            onClick={() => {}}
          >
           Orders
          </button>
        </Link>
        <Link to="/user/profile">
          <button
            type="button"
            class="btn btn-outline-dark"
            style={{ width: "20rem" }}
          >
            update profile
          </button>
        </Link>
        <Link to="/user/track-order">
          <button
            type="button"
            class="btn btn-outline-dark"
            style={{ width: "20rem" }}
          >
            Track Order
          </button>
        </Link>
     
      </div>
    </div>
  );
};

export default UserPannel;
