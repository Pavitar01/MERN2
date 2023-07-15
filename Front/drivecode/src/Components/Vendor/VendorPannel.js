import React, { useEffect, useState } from "react";
import { useAuth } from "../../Auth/Index";
import { Link } from "react-router-dom";
import Middle from "../Middle";
import axios from "axios";

const VendorPannel = () => {
  const [auth, setAuth] = useAuth();
  const [details,setDetails]=useState({})
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
        <div className="col-4">
      <div
        class="card "
        style={{ width: "100%", display: "flex", alignItems: "center" }}
      >
        <img
          className="card-img-top"
          src="https://static.vecteezy.com/system/resources/previews/000/550/731/original/user-icon-vector.jpg"
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
            style={{ textAlign: "center", width: "100%" ,textTransform:"capitalize"}}
          >
            {details.name}
          </h6>
          <h6
            className="card-title"
            style={{ textAlign: "center", width: "100%" }}
          >
            {auth.user.email}
          </h6>
          <h6
            className="card-title"
            style={{ textAlign: "center", width: "100%" }}
          >
            {auth.user.phone}
          </h6>
        </div>
      </div>
      <div
        class="btn-group-vertical card-body"
        role="group"
        aria-label="Basic outlined example"
      >
        <Link to="/vendor-dashboard/">
          <button
            type="button"
            class="btn btn-outline-dark"
            style={{ width: "20rem" }}
            onClick={() => {}}
          >
            Add Products
          </button>
        <Link to="/vendor-dashboard/vendor-product">
          <button
            type="button"
            class="btn btn-outline-dark"
            style={{ width: "20rem" }}
          >
            My Products
          </button>
        </Link>
        </Link>
       
   
        <Link to="/vendor-dashboard/update-profile">
          <button
            type="button"
            class="btn btn-outline-dark"
            style={{ width: "20rem" }}
          >
            Update Profile
          </button>
        </Link>
        <Link to="/vendor-dashboard/all-order">
          <button
            type="button"
            class="btn btn-outline-dark"
            style={{ width: "20rem" }}
          >
            Orders
          </button>
        </Link>
        <Link to="/vendor-dashboard/vendor-draft">
          <button
            type="button"
            class="btn btn-outline-dark"
            style={{ width: "20rem" }}
          >
            Drafts
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VendorPannel;
