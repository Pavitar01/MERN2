import React, { useEffect, useState } from "react";
import axios from "axios";
import Middle from "../Middle";
import SideMenu from "../../Pages/SideMenu";
import { Button, Card, Modal } from "antd";
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
          console.log(products);

          const filteredProd = products.filter(
            (product) => product.orders >= 5
          );
          setProd(filteredProd);
          console.log(prod);
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
        <div className="col-12">
          <h1 style={{ textAlign: "center" }}>BEST SELLING PRODUCTS</h1>
          <p> ( Product have more than five sales )</p>
          <div style={{ display: "flex" }}>
            {prod.length !== 0 ? (
              prod.map((i, index) => {
                if (i.status !== 1) {
                  return (
                    <Card
                      key={index}
                      hoverable
                      style={{ width: 240, height: 400,textTransform:"capitalize" }}
                      cover={
                        <img
                          alt="example"
                          src="https://th.bing.com/th/id/OIP.4gizB9_xXckR4sDo9OoOHwHaHa?pid=ImgDet&rs=1"
                        />
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
                No Products Available At This Moment
              </div>
            )}
            <Modal
              title={`Product Id: ${mod._id}`}
              visible={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                src="https://th.bing.com/th/id/OIP.4gizB9_xXckR4sDo9OoOHwHaHa?pid=ImgDet&rs=1"
              />
              <h1 style={{ textAlign: "left",textTransform:"capitalize" }}>
                {mod.name} <br />
                <span style={{ fontSize: "20px", fontWeight: "100" }}>
                  Description:{mod.des}
                </span>
              </h1>
              <h3> &#8377;{mod.price} </h3>
              <div style={{ display: "flex", gap: "5px" }}>
                <button
                  className="btn btn-primary"
                  type="button"
                  value="Input"
                  onClick={handleClick2}
                  disabled={counter <= 1 ? true : false}
                >
                  -
                </button>
                <h5>{counter}</h5>
                <button
                  className="btn btn-primary"
                  type="button"
                  value="Input"
                  onClick={handleClick1}
                  disabled={counter >= 10 ? true : false}
                >
                  +
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </Middle>
  );
};

export default BestSeller;
