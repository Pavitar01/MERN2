import React, { useEffect, useState } from "react";
import Middle from "../Middle";
import AdminPannel from "./AdminPannel";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button, message, Space } from "antd";
const Category = () => {
  const [cat, setCat] = useState([]);
  const [name, setName] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const deleteCategory = async (id) => {
    try {
      const data = await axios.post(
        "http://localhost:8000/api/category/delete-category",
        { id }
      );
      if (data.data.success) {
        messageApi.open({
          type: "success",
          content: "Category Deleted Successfully !",
        });
      }
    } catch (err) {
      messageApi.open({
        type: "error",
        content: "Error in Deleting cateogory !",
      });
    }
  };
  const handleSubmit = async (e) => {
    setName("");

    e.preventDefault();
    if (name !== "") {
      try {
        const data = await axios.post(
          "http://localhost:8000/api/category/create-category",
          { name }
        );

        if (data.data.success) {
          messageApi.open({
            type: "success",
            content: "Category Added Successfully !",
          });
        } else {
          messageApi.open({
            type: "error",
            content: data.data.message,
          });
        }
      } catch (err) {
        messageApi.open({
          type: "error",
          content: "Error in creating cateogory !",
        });
      }
    } else {
      messageApi.open({
        type: "warning",
        content: "Please fill in feild !",
      });
    }
  };
  useEffect(() => {
    const a = async () => {
      try {
        const data = await axios.get(
          "http://localhost:8000/api/category/all-categories"
        );
        if (data?.data?.success) {
          setCat([...data?.data?.category]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    a();
  }, [cat]);
  return (
    <Middle>
      {contextHolder}
      <div className="container">
        <div className="row  mt-5">
          <AdminPannel />
          <div className="col-8">
            <h1>Category</h1>
            <form
              style={{ display: "flex", height: "50px", width: "90%" }}
              onSubmit={handleSubmit}
            >
              <div class="form-group" style={{ width: "90%" }}>
                <input
                value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  class="form-control"
                  style={{ height: "40px" }}
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                style={{ width: "100px", height: "40px" }}
              >
                Add
              </button>
            </form>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {cat?.map((i, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row" style={{ width: "40%" }}>
                        {index}
                      </th>
                      <td style={{ width: "100" }}>{i.name}</td>
                      <td>
                        <i
                          class="fa-sharp fa-solid fa-trash"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            deleteCategory(i._id);
                          }}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Middle>
  );
};

export default Category;
