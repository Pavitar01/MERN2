import React, { useEffect, useState } from "react";
import Middle from "../Middle";
import AdminPannel from "./AdminPannel";
import axios from "axios";

import { Select } from "antd";
import { useAuth } from "../../Auth/Index";
const { Option } = Select;

const Products = () => {
  const [cat, setCat] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [Err, setErr] = useState("");
  const [auth, setAuth] = useAuth();

  //fomrmdata
  const setimgfile = (e) => {
    setFile(e.target.files[0]);
  };

  console.log(file);
  //handlesubmit

  const handleSubmit = async (e) => {
    var formData = new FormData();
    formData.append("photo", file);
    e.preventDefault();

    try {
      if (
        !name ||
        !des ||
        !price ||
        !quantity ||
        file === null
        // p2 === null ||
        // p3 === null ||
        // p4 == null
      ) {
        setErr("all feilds are required !");
      }

      const data = await axios.post(
        "http://localhost:8000/api/product/create-product",
        {
          name,
          image: file,
          des,
          price,
          quantity,
          category,
          addedby: auth?.user?.email,
          order: 0,
        }
      );
      if (data.data.success) {
        setErr("Product Added Successfully !");
        setFile(null);
        setQuantity(1);
        setName("");
        setDes("");
        setPrice("");
      } else {
        setErr(data.data.message);
      }
    } catch (err) {
      setErr("Something went Wrong!");
    }
  };

  useEffect(() => {
    const a = async () => {
      try {
        const data = await axios.get(
          "http://localhost:8000/api/category/all-categories"
        );
        if (data?.data?.success) {
          setCat(data?.data?.category);
        }
      } catch (error) {
        console.log(error);
      }
    };
    a();
  }, []);
  return (
    <Middle>
      <div className="container" style={{ display: "flex", width: "100%" }}>
        <div className="row  mt-5">
          <AdminPannel />
          <div
            className="col-5"
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <h1
              style={{ textAlign: "left", height: "80px", marginLeft: "20px" }}
            >
              Add Products
            </h1>
            <div className="w-50">
              <form onSubmit={handleSubmit} style={{ width: "390px" }}>
                <Select
                  bordered={true}
                  placeholder="Select a category"
                  size="large"
                  className="form-select mb-3 w-50"
                  showSearch
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {cat?.map((i, index) => {
                    return (
                      <Option key={index} value={i.name}>
                        {i.name}
                      </Option>
                    );
                  })}
                </Select>
                <div className="form-group">
                  <label for="exampleFormControlInput1">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    id="exampleFormControlInput1"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <label for="exampleFormControlInput1">Price</label>

                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                  <label for="exampleFormControlSelect1">Select quantity</label>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    value={Option.value}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </div>

                <div className="form-group">
                  <label for="exampleFormControlTextarea1">Description</label>
                  <textarea
                    onChange={(e) => {
                      setDes(e.target.value);
                    }}
                    value={des}
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
                <div style={{ display: "flex" }}>
                  <input
                    type="file"
                    onChange={setimgfile}
                    name="image"
                    className="form-control-file"
                    id="exampleFormControlFile1"
                    style={{ border: "none", height: "50px" }}
                    multiple
                  />
                </div>
                <p>{Err}</p>
                <button
                  type="submit"
                  className="btn btn-primary mb-2"
                  style={{ width: "100%" }}
                >
                  Add Product
                </button>
              </form>
            </div>
          </div>
          {/* <img src="https://th.bing.com/th/id/OIP.gRKRV2CE6NViDJXwdJOziQHaH4?pid=ImgDet&rs=1" alt="img" style={{width:"200px",height:"200px"}}/> */}
        </div>
      </div>
    </Middle>
  );
};

export default Products;
