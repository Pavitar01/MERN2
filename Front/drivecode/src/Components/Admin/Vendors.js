import React, { useEffect, useState } from "react";
import Middle from "../Middle";
import AdminPannel from "./AdminPannel";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;

const Vendors = () => {
  const [vender, setVendors] = useState([]);
  useEffect(() => {
    const a = async () => {
      try {
        const data = await axios.get(
          "http://localhost:8000/api/product/all-venders"
        );
        setVendors(data.data.user);
      } catch (error) {}
    };
    a();
  }, []);
  const handleChange = async (event) => {
    try {
      const data = await axios.put(
        "http://localhost:8000/api/product/vender-status",
        {
          id: event.id,
          flag: event.event,
        }
      );
      if (data.data.success) {
        alert(data.data.message);
      } else {
        alert("error");
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <Middle>
      <div className="container">
        <div className="row  mt-5">
          <AdminPannel />
          <div className="col-8">
            <h1>All Vendors</h1>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Venders</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {vender.map((i, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index}</th>
                      <td>{i.name}</td>
                      <td>{i.flag === 1 ? "🟢" : "🔴"}</td>
                      <td>
                        <select
                          className="form-control"
                          id="exampleFormControlSelect1"
                          value={Option.value}
                          onChange={(e) => {
                            handleChange({ event: e.target.value, id: i._id });
                          }}
                        >
                          {i.flag === 1 ? (
                            <>
                              <option value={1}>Active</option>
                              <option value={0}>Disabled</option>
                            </>
                          ) : (
                            <>
                              <option value={0}>Disabled</option>
                              <option value={1}>Active</option>
                            </>
                          )}
                        </select>
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

export default Vendors;
