import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Modal, Carousel, Input } from "antd";
import Meta from "antd/es/card/Meta";
import { useAuth } from "../../Auth/Index";
import Footer from "../Footer";
import SideMenu from "../../Pages/SideMenu";
import Middle from "../Middle";
import { useNavigate } from "react-router-dom";
import ColumnGroup from "antd/es/table/ColumnGroup";
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [options, setOptions] = useState("");

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
  }, [options, searchString]);
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
    setIsModalOpen(false);
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

  return (
    <>
      <Middle
        handleSearchString={handleSearchString}
        searchString={searchString}
      >
        <div className="container-fluid" style={{ display: "flex" }}>
          <SideMenu setOption={setOptions} />
          <div className="col-8">
            <Carousel autoplay>
              <div>
                <img
                  src="https://i.pinimg.com/originals/02/cf/cf/02cfcffac595c832c514d58704cd82ce.jpg"
                  width="100%"
                  height="100%"
                />
              </div>
              <div>
                <img
                  src="https://th.bing.com/th/id/OIP._M1llvKmA14pBnR2I0PzQgHaE_?pid=ImgDet&rs=1"
                  width="100%"
                  height="100%"
                />
              </div>
              <div>
                <img
                  src="https://i.pinimg.com/originals/ce/99/0c/ce990c0668729dc4bafeb093ecb964dc.jpg"
                  width="100%"
                  height="100%"
                />
              </div>
              <div>
                <img
                  src="https://th.bing.com/th/id/R.d1ed34ac8f711d6d807bacb7f217852c?rik=D3hF6b%2bxzryonA&riu=http%3a%2f%2fgraphicgoogle.com%2fwp-content%2fuploads%2f2017%2f10%2fFacebook-Fashion-Big-Sale-Banner.jpg&ehk=xAR7O2yBftDuPOZZ2li0TEjvnMDEw2%2fuJhTgzEniJoc%3d&risl=&pid=ImgRaw&r=0"
                  width="100%"
                  height="100%"
                />
              </div>
            </Carousel>
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
            value={searchString}
            onChange={handleSearchString}
            style={{ fontSize: "20px" }}
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
                            <img src={i} style={{ width: "300px" }} />
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
                        className="fa-solid fa-cart-arrow-down"
                        style={{
                          fontSize: "15px",
                          textTransform: "capitalize",
                        }}
                        onClick={() => showModal(product)}
                        disabled={!auth.user ? true : false}
                      >
                        {!auth?.user ? "Login First" : "Add To Cart"}
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
