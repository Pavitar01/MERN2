import React, { useState } from "react";
import Middle from "../Components/Middle";
import AdminPannel from "../Components/Admin/AdminPannel";

const AdminDashBoard = (props) => {
  return (
    <Middle>
      <div className="container">
        <div className="row  mt-5">
          <AdminPannel />
          <div className="col-8">
            <h1>My Products</h1>
          </div>
        </div>
      </div>
    </Middle>
  );
};

export default AdminDashBoard;
