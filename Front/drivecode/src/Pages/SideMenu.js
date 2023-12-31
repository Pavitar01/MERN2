import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import banner2 from ".././Newfolder/banner2.jpg";
const SideMenu = ({ setOption }) => {
  const [cat, setCat] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  const setOptions = (category) => {
    setOption(category);
    setActiveCategory(category);
  };

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
  }, []);

  return (
    <nav
      style={{ width: "300px", marginLeft: "-150px", position: "relative" }}
      id="sidebarMenu"
      className="collapse d-lg-block sidebar collapse bg-white"
    >
      <div className="position-sticky">
        <div className="list-group list-group-flush mx-3 mt-4">
          <Button
            to="/"
            className={`list-group-item list-group-item-action py-2 ripple ${
              activeCategory === "" ? "active" : ""
            }`}
            onClick={() => setOptions("")}
          >
            <i className="fa-solid fa-house"></i>&nbsp;
            <span>Home</span>
          </Button>

          <span
            className={`list-group-item list-group-item-action py-2 ripple ${
              activeCategory === "trending" ? "active" : ""
            }`}
            onClick={() => setOptions("trending")}
          >
            <i className="fa-light fa-family-pants"></i>
            <span>All category </span>
          </span>

          <div
            style={{ height: "200px", width: "100%", overflow: "scroll" }}
            className="scrollBar"
          >
            {cat.map((category, index) => (
              <Button
                key={index}
                onClick={() => setOptions(category.name)}
                style={{ height: "40px" }}
                type="primary"
                className={`list-group-item list-group-item-action py-2 ripple ${
                  activeCategory === category.name ? "active" : ""
                }`}
              >
                <i className="fa-solid fa-star" style={{ float: "left" }}>
                  &nbsp;
                </i>
                <span
                  style={{
                    textTransform: "capitalize",
                    float: "left",
                    marginLeft: "20px",
                  }}
                >
                  {category.name} Category
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <img
        src={banner2}
        width={250}
        height={200}
        style={{ position: "absolute", bottom: "0", left: "10%" }}
      />
    </nav>
  );
};

export default SideMenu;
