import React from "react";
import Middle from "../Middle";
import SideMenu from "../../Pages/SideMenu";

const BestSeller = () => {
  return (
    <Middle>
      <div className="container-fluid" style={{ display: "flex" }}>
        <SideMenu />
        <div className="col-8">
          <h1>Best Sellers</h1>
        </div>
      </div>
    </Middle>
  );
};

export default BestSeller;
