import React, { useEffect, useState } from "react";
import AdminPannel from "./AdminPannel";
import Middle from "../Middle";

import axios from "axios";
import Card from "./Card";
import { Space, Spin } from "antd";

const EditProducts = () => {
  const [prod, setProd] = useState([]);
  useEffect(() => {
    const a = async () => {
      try {
        const data = await axios.get(
          "http://localhost:8000/api/product/get-product"
        );
        if (data?.data?.success) {
          setProd(data.data.products);
        }
      } catch (error) {
        console.log(error);
      }
    };
    a();
  }, [prod]);
  return (
    <Middle>
      <div className="container">
        <div className="row  mt-5">
          <AdminPannel />
          <div className="col-8">
            <h1>Publised Product</h1>
            <div
              className="scrollBar"
              style={{
                width: "100%",
                height: "580px",
                display: "flex",
                gap: "20px",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                overflow: "scroll",
                boxShadow: "1px 1px 10px 1px lightgray",
              }}
            >
              {prod.length !== 0 ? (
                prod.map((i, index) => {
                  return (
                    <Card
                      key={index}
                      orders={i.orders}
                      quantity={i.quantity}
                      name={i.name}
                      category={i.category}
                      price={i.price}
                      des={i.des}
                      pid={i._id}
                      image={i.image}
                      addedBy={i.Addedby}
                      newstatus={i.status}
                      status={i.status === 0 ? "Published" : "Draft"}
                      outstock={i.outStock === 1 ? "Out of stock" : "Have Stock"}

                    />
                  );
                })
              ) : (
                <Space
                  direction="vertical"
                  style={{
                    width: "50%",
                    display:"flex",
                    justifyContent:"center",
                    height:"100%"
                  }}
                >
                 <Space direction="vertical">
                 <Spin tip="Fetching your products" size="large" style={{width:"300px"}}>
                    <div className="content" />
                  </Spin>
                 </Space>
                </Space>
              )}
            </div>
          </div>
        </div>
      </div>
    </Middle>
  );
};

export default EditProducts;
