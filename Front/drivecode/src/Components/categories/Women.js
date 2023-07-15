import React, { useEffect, useState } from "react";
import Middle from "../Middle";
import SideMenu from "../../Pages/SideMenu";
import axios from "axios";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";

const Women = () => {
    const [prod, setProd] = useState([]);
    useEffect(() => {
      const a = async () => {
        try {
          const data = await axios.post(
            "http://localhost:8000/api/product/get-product-by-category",
            { cat: "women" }
          );
          if (data?.data?.success) {
            setProd(data.data.products);
          }
        } catch (error) {
          console.log(error);
        }
      };
      a();
    }, []);
  return (
    <Middle>
      <div className="container-fluid" style={{ display: "flex" }}>
        <SideMenu />
        <div className="col-8">
          <h1>Women's Category</h1>
          {prod.length !== 0
            ? prod.map((i, index) => {
                return (
                  <Card
                    hoverable
                    style={{ width: 240, height: 400 }}
                    cover={
                      <img
                        alt="example"
                        src="https://th.bing.com/th/id/OIP.4gizB9_xXckR4sDo9OoOHwHaHa?pid=ImgDet&rs=1"
                      />
                    }
                  >
                    <Meta title={i.name} description="www.instagram.com" />
                  </Card>
                );
              })
              : <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}><h1>No Products Available At This Moment</h1></div>}

        </div>
      </div>
    </Middle>
  );
};

export default Women;
