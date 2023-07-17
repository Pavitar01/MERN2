import React, { useEffect, useState } from "react";
import axios from "axios";
import Middle from "../Middle";
import SideMenu from "../../Pages/SideMenu";
import { Button, Card, Carousel, Modal, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import { useAuth } from "../../Auth/Index";

const BestSeller = () => {
  const [options, setOptions] = useState(null);
  const [auth, setAuth] = useAuth();
  const [prod, setProd] = useState([]);
  const [value, setValue] = useState("");
  const [counter, setCounter] = useState(1);
  const [mod, setMod] = useState({});
  const [newProd, setNewProd] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function is called every time the increment button is clicked
  const handleClick1 = () => {
    // Counter state is incremented
    setCounter(counter + 1);
  };

  // Function is called every time the decrement button is clicked
  const handleClick2 = () => {
    // Counter state is decremented
    setCounter(counter - 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/product/get-product"
        );
        if (response?.data?.success) {
          const products = response.data.products;
          const filteredProd = products.filter(
            (product) => product.orders >= 5
          );
          setProd(filteredProd);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Modal

  const showModal = (product) => {
    setMod(product);
    setIsModalOpen(true);
    setNewPrice(product.price);
    setNewProd(product._id);
    setNewQuantity(counter);
  };
  const handleOk = async () => {
    let val = localStorage.getItem("userAuth");
    val = JSON.parse(val);
    await axios.post(
      `http://localhost:8000/api/cart-item/cart/${val.user.id}`,
      {
        productId: newProd,
        quantity: parseInt(newQuantity),
      }
    );
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Middle>
      <div className="container-fluid" style={{ display: "flex" }}>
        <div className="col-11">
          <h1 style={{ textAlign: "center", color: "gray" }}>
            BEST SELLING PRODUCTS
          </h1>
          <p>
            {" "}
            ( Product have more than five sales )
            <br />
            -- Many times Added to cart items --
          </p>
          <div
            style={{
              display: "flex",
              width: "100%",
              overflow: "scroll",
              flexWrap: "wrap",
              height: "80vh",
              padding: "10px",
              gap: "20px",
              justifyContent: "space-around",
            }}
          >
            {prod.length !== 0 ? (
              prod.map((i, index) => {
                if (i.status !== 1) {
                  return (
                    <Card
                      key={index}
                      hoverable
                      style={{
                        width: 300,
                        height: 500,
                        margin: "20px",
                        boxShadow: "1px 1px 10px 1px lightgray",
                        textTransform: "capitalize",
                      }}
                      cover={
                        <Carousel autoplay>
                          {i.image.map((i, index) => {
                            return (
                              <div key={index}>
                                <img
                                  src={i}
                                  style={{ width: "300px", height: "250px" }}
                                />
                              </div>
                            );
                          })}
                        </Carousel>
                      }
                    >
                      <Meta title={i.name} />

                      <h1 style={{ textAlign: "left", fontSize: "15px" }}>
                        &#8377;{i.price}{" "}
                        <del style={{ fontSize: "15px", color: "gray" }}>
                          {i.price * 2}
                        </del>
                      </h1>
                      <Meta title={i.category} />

                      <p style={{ width: "100%" }}>
                        <span
                          style={{
                            float: "right",
                            fontSize: "15px",
                            width: "100%",
                            textAlign: "center",
                          }}
                        >
                          <Button
                            type="primary"
                            className="fa-solid fa-cart-arrow-down"
                            style={{ fontSize: "15px" }}
                            onClick={() => showModal(i)}
                            disabled={!auth.user ? true : false}
                          >
                            Add To Cart
                          </Button>
                          <p
                            style={{
                              textAlign: "left",
                              color: "gray",
                              width: "300",
                              fontSize: "15px",
                            }}
                          >
                            <span style={{ color: "black", fontWeight: 600 }}>
                              Seller Id
                            </span>
                            {i.Addedby}
                          </p>
                        </span>
                      </p>
                    </Card>
                  );
                }
              })
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                 <Spin size="large" />
              </div>
            )}
            <Modal
              title={`Product Id: ${mod._id}`}
              visible={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Carousel autoplay>
                {mod.image && mod.image.length > 0 ? (
                  mod.image.map((imageUrl, index) => (
                    <div key={index}>
                      <img
                        src={imageUrl}
                        style={{ width: "300px", marginLeft: "90px" }}
                      />
                    </div>
                  ))
                ) : (
                  <div>No images available.</div>
                )}
              </Carousel>
              <h1 style={{ textAlign: "left", textTransform: "capitalize" }}>
                {mod.name} <br />
                <span style={{ fontSize: "20px", fontWeight: "100" }}>
                  Description:{mod.des}
                </span>
              </h1>
              <h3> &#8377;{mod.price} </h3>
            </Modal>
          </div>
        </div>
      </div>
    </Middle>
  );
};

export default BestSeller;
