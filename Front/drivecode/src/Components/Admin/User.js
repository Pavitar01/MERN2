import React from "react";
import Middle from "../Middle";
import AdminPannel from "./AdminPannel";

const User = () => {
  return (
    <Middle>
      <div className="container">
        <div className="row  mt-5">
          <AdminPannel />
          <div className="col-8">
            <h1>Users</h1>
           
          </div>
        </div>
      </div>
    </Middle>
  );
};

export default User;
