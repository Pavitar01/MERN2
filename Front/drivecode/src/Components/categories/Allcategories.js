import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Modal,
  Carousel,
  Input,
  Spin,
  Space,
  message,
} from "antd";
import Meta from "antd/es/card/Meta";
import { useAuth } from "../../Auth/Index";
import Footer from "../Footer";
import SideMenu from "../../Pages/SideMenu";
import Middle from "../Middle";
import { useNavigate } from "react-router-dom";
import banner from "../../Newfolder/banner.jpg";
import img from "../../Newfolder/banner1.jpg"

const Allcategories = () => {
  const [prod, setProd] = useState([]);
  const [auth, setAuth] = useAuth();
  const [value, setValue] = useState("");
  const [details, setDetails] = useState([]);
  const [counter, setCounter] = useState(1);
  const [mod, setMod] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [newProd, setNewProd] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [options, setOptions] = useState("");
  const [num, setNum] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

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
          let filteredProducts = products;
          if (options) {
            filteredProducts = filteredProducts.filter(
              (product) => product.category === options
            );
          }
          if (searchString) {
            filteredProducts = filteredProducts.filter((product) =>
              product.name.toLowerCase().includes(searchString.toLowerCase())
            );
          }
          setProd(filteredProducts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [options, searchString, num]);

  let val = localStorage.getItem("userAuth");
  val = JSON.parse(val);
  useEffect(() => {
    const fetchData = async () => {
      setValue(val?.user.id);
      try {
        const response = await axios.post(
          "http://localhost:8000/api/product/get-vendor-by-id",
          { id: val?.user?.id }
        );
        if (response.data?.success) {
          setDetails(response.data.user || user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/cart-item/cart/${value}`
        );
        if (response.data.success) {
          setCartItems(response.data.cart.items);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCartItems();
  }, [value]);

  // Modal
  const showModal = (product) => {
    setMod(product);
    setIsModalOpen(true);
    setNewPrice(product.price);
    setNewProd(product._id);
    setNewQuantity(counter);
  };

  const handleOk = async () => {
    await axios.post(`http://localhost:8000/api/cart-item/cart/${value}`, {
      productId: newProd,
      quantity: parseInt(newQuantity),
    });
    navigate("/");
    setNum(num + 1);
    setIsModalOpen(false);
    messageApi.success("Product Added");
    messageApi.info("Please Refresh ...");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (e) => {
    setOptions(e.target.value);
  };

  const handleSearchString = (e) => {
    setSearchString(e.target.value);
  };

  const isAddedToCart = (productId) => {
    return cartItems.some((item) => item.productId === productId);
  };

  const isOutStock = (outstock) => {
    return outstock === 1;
  };

  return (
    <>
      <Middle
        handleSearchString={handleSearchString}
        searchString={searchString}
      >
        {contextHolder}

        <div className="container-fluid" style={{ display: "flex" }}>
          <SideMenu setOption={setOptions} />
          <div className="col-10" style={{ display: "flex", gap: "10px" }}>
            <div style={{ width: "75%", height: "auto" }}>
              <Carousel autoplay style={{ width: "100%" }}>
                <div>
                  <img
                    src="https://i.pinimg.com/originals/02/cf/cf/02cfcffac595c832c514d58704cd82ce.jpg"
                    width="100%"
                    height="100%"
                  />
                </div>
                <div>
                  <img
                    src={img}
                    width="100%"
                    height="100%"
                  />
                </div>
                <div>
                  <img
                    src="https://assetscdn1.paytm.com/images/catalog/view_item/787364/1617369686163.jpg?imwidth=480&impolicy=hq"
                    width="100%"
                    height="100%"
                  />
                </div>
                <div>
                  <img
                    src="https://3.bp.blogspot.com/-AcY0y1_2Tj0/X1gCorMCBxI/AAAAAAAAAGc/pf2-mG0D7902_PaukCkGuu2gCO9UgJDWQCK4BGAYYCw/s1600/banner2.jpg"
                    width="100%"
                    height="100%"
                  />
                </div>
              </Carousel>
            </div>
            <img src={banner} width={400} height={500} />
          </div>
        </div>
      </Middle>
      <h1
        style={{
          color: "gray",
          padding: "20px",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        BEST OF {options} CATEGORY{" "}
        <span style={{ width: "300px" }}>
          <input
            type="text"
            placeholder="Search by Product name"
            value={searchString}
            onChange={handleSearchString}
            style={{ fontSize: "20px", padding: "20px" }}
          />
        </span>
      </h1>
      <div
        className="col-12 scrollBar"
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
        {prod?.length !== 0 ? (
          prod.map((product, index) => {
            if (product?.Addedby !== value && product?.status === 0) {
              const addedToCart = isAddedToCart(product._id);
              const OutofStock = isOutStock(product.outStock);

              return (
                <Card
                  key={index}
                  hoverable
                  style={{
                    width: 300,
                    height: 500,
                    boxShadow: "1px 1px 10px 1px lightgray",
                    textTransform: "capitalize",
                  }}
                  cover={
                    <Carousel autoplay>
                      {product.image.map((i, index) => {
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
                  <Meta title={product.name} />
                  <h1 style={{ textAlign: "left", fontSize: "15px" }}>
                    &#8377;{product.price}&nbsp;
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
                        style={{
                          fontSize: "15px",
                          textTransform: "capitalize",
                        }}
                        onClick={() => showModal(product)}
                        disabled={!auth.user || addedToCart || OutofStock}
                      >
                        {!auth?.user
                          ? "Login First"
                          : OutofStock
                          ? "Out Of Stocks"
                          : addedToCart
                          ? "Added To Cart"
                          : "View Product"}
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
            <Space direction="vertical" style={{ width: "100%" }}>
              <Spin tip="Loading" size="large">
                <div className="content" />
              </Spin>
            </Space>
          </div>
        )}

        <Modal
          title={`Product Id: ${mod._id}`}
          visible={isModalOpen}
          
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel} type="primary" danger>
              Back 
            </Button>,
            <Button
            type="primary"
              key="submit"
              onClick={handleOk}
            >
              Add To cart
            </Button>,
          ]}
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
              Description: {mod.des}
            </span>
          </h1>
          <h3> &#8377;{mod.price} </h3>
        </Modal>
      </div>
      <h1
        style={{
          textAlign: "center",
          height: "100px",
          marginTop: "100px",
          fontSize: "45px",
          color: "gray",
        }}
      >
        More Product List
      </h1>
      <Footer />
    </>
  );
};

export default Allcategories;
