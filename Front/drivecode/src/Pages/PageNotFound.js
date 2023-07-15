import React from "react";
import Middle from "../Components/Middle";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
      <div className="page" style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
        <h2 style={{ fontSize: "150px", marginTop: "20px" }}>404</h2>
        <h2>Oops! Page Not Found</h2>
        <Link to="/">
          <button>
            <i class="fa-solid fa-arrow-left"></i>Back
          </button>
        </Link>
      </div>
  );
};

export default PageNotFound;
