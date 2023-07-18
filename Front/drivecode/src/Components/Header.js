import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/Index";
import toast from "react-hot-toast";
import axios from "axios";
import { Tag,Input } from "antd";
const { Search } = Input;

const Header = ({prod, handleSearchString, searchString }) => {
  const [auth, setAuth] = useAuth();
  const [cat, setCat] = useState([]);     
  const [cart, setCart] = useState([]);     

  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("userAuth");
    toast.success("Logout Successfully !");
  };


  useEffect(() => {
    const a = async () => {
      let val = localStorage.getItem("userAuth");
      val = JSON.parse(val);
      const data = await axios.get(
        `http://localhost:8000/api/cart-item/cart/${val.user.id}`
      );
      if (data.data.success) {
        setCart(data.data.cart.items);
      } else {
        console.log("Failed in fetching!");
      }
    };

    a();
  }, []);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/category/all-categories"
        );
        if (response?.data?.success) {
          setCat(response?.data?.category);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, [auth]);



  const [Details,setDetails]=useState([])
  useEffect(() => {
    let val = localStorage.getItem("userAuth");
    val = JSON.parse(val);
    const fetchData = async () => {
      const data = await axios.post("http://localhost:8000/api/auth/all-user", {
        email: val?.user?.email,
      });
      setDetails(data.data);
    };
    fetchData();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to="/">
            <i className="fa-sharp fa-solid fa-cart-shopping"></i>Shopo.in
          </Link>
          <form
            className="form-inline mt-2 my-lg-0  ms-auto"
            style={{ display: "flex", width: "100%" }}
          >
            {/* <Search
              placeholder="Search in ShopCart.in by category....."
              value={searchString}
              onChange={handleSearchString}
              style={{ width: "100%", margin: "20px" }}
            /> */}
          </form>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {Details?.role === 2 ? (
              ""
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/policy"
                  >
                    Policy
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/best-seller"
                  >
                    Best Sellings
                  </NavLink>
                </li>
              </>
            )}

            {!auth.user ? (
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  Login
                </Link>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {Details.name}
                </Link>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {Details.role === 0 && (
                    <NavLink className="dropdown-item" to="/user-dashboard">
                      User Dashboard
                    </NavLink>
                  )}
                  {Details.role === 1 && (
                    <NavLink className="dropdown-item" to="/vendor-dashboard">
                      Vendor Dashboard
                    </NavLink>
                  )}
                  {Details.role === 2 && (
                    <NavLink className="dropdown-item" to="/admin-dashboard">
                      Admin Dashboard
                    </NavLink>
                  )}
                  <Link to="/" className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              </li>
            )}
            {Details.role === 2 ? (
              ""
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  <i
                    className="fa-solid fa-cart-shopping"
                    style={{ fontSize: "20px" }}
                  ></i>
                  <Tag
                    color="cyan"
                    style={{ fontSize: "15px", marginTop: "-5px" }}
                  >
                    {cart?.length}
                  </Tag>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
