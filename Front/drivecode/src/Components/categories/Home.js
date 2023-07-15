import React, { useEffect, useState } from "react";
import Middle from "../Middle";
import SideMenu from "../../Pages/SideMenu";
import axios from "axios";
import { Button, Card, Modal } from "antd";
import Meta from "antd/es/card/Meta";
import { useAuth } from "../../Auth/Index";
import ProductList from "./ProductList";

const Home1 = () => {
  const [prod, setProd] = useState([]);
  const [auth, setAuth] = useAuth();
  const [value, setValue] = useState("");
  const [details, setDetails] = useState([]);
  const [counter, setCounter] = useState(1);
  const [mod, setMod] = useState({});

  const [newProd, setNewProd] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [options, setOption] = useState("");

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

  const user = {
    _id: 12345678,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/product/get-product"
        );
        if (response?.data?.success) {
          const products = response.data.products;
          if (options) {
            const filteredProducts = products.filter(
              (product) => product.category === options
            );
            setProd(filteredProducts);
          } else {
            setProd(products);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [options]);

  useEffect(() => {
    const fetchData = async () => {
      let val = localStorage.getItem("userAuth");
      val = JSON.parse(val);
      setValue(val?.user);
      try {
        const response = await axios.post(
          "http://localhost:8000/api/product/get-vendor-by-id",
          { id: val?.user?.id }
        );
        if (response.data?.success) {
          setDetails(response?.data?.user || user);
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
    await axios.post(`http://localhost:8000/api/cart-item/cart/${value.id}`, {
      productId: newProd,
      quantity: parseInt(newQuantity),
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log(options);
  return (
    <Middle prod={prod} setProd={setProd}>
      <div className="container-fluid" style={{ display: "flex" }}>
        <SideMenu setOption={setOption} />

        <div
          className="col-8"
          style={{
            display: "flex",
            width: "100%",
            overflow: "scroll",
            flexWrap: "wrap",
            height: "80vh",
            gap: "20px",
            justifyContent: "space-evenly",
          }}
          class="scrollBar"
        >
          {prod?.length !== 0 ? (
            prod.map((product, index) => {
              if (product?.Addedby !== details?._id && product?.status === 0) {
                return (
                  <Card
                    key={index}
                    hoverable
                    style={{ width: 240, height: 400 }}
                    cover={
                      <img
                        alt="example"
                        src="https://th.bing.com/th/id/OIP.4gizB9_xXckR4sDo9OoOHwHaHa?pid=ImgDet&rs=1"
                      />
                    }
                  >
                    <Meta title={product.name} />

                    <h1 style={{ textAlign: "left", fontSize: "15px" }}>
                      &#8377;{product.price}{" "}
                      <del style={{ fontSize: "15px", color: "gray" }}>
                        {product.price * 2}
                      </del>
                    </h1>
                    <Meta title={product.category} />

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
                          onClick={() => showModal(product)}
                          disabled={!auth.user ? true : false}
                        >
                          Add To Cart
                        </Button>
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
            title="Basic Modal"
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <img
              alt="example"
              src="https://th.bing.com/th/id/OIP.4gizB9_xXckR4sDo9OoOHwHaHa?pid=ImgDet&rs=1"
            />
            <h1 style={{ textAlign: "left" }}>
              title:{mod.name} <br />
              <span style={{ fontSize: "20px", fontWeight: "100" }}>
                description:{mod.des}
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
    </Middle>
  );
};

export default Home1;
