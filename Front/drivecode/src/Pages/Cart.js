import React, { useEffect, useState } from "react";
import Middle from "../Components/Middle";
import {
  Button,
  Card,
  Col,
  Modal,
  Popover,
  Row,
  Tag,
  message,
  Select,
  Carousel,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [cart2, setCart2] = useState([]);
  const [dis, setDis] = useState(0);
  const [counter, setCounter] = useState(1);
  const [val, setVal] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const handleChange = (value) => {
    setDis(value);
  };
  const navigate = useNavigate();

  const handleClick2 = async () => {
    let val = localStorage.getItem("userAuth");
    val = JSON.parse(val);
    try {
      const response = await axios.put(
        `http://localhost:8000/api/cart-item/cart/${val.user.id}`,
        {
          productId: editedItem.productId,
          quantity: counter - 1,
        }
      );
      if (response.data.success) {
        setCart2(response.data.cart);
        setCart(response.data.cart.items);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick1 = async () => {
    let val = localStorage.getItem("userAuth");
    val = JSON.parse(val);
    try {
      const response = await axios.put(
        `http://localhost:8000/api/cart-item/cart/${val.user.id}`,
        {
          productId: editedItem.productId,
          quantity: counter + 1,
        }
      );
      console.log(response.data);
      if (response.data.success) {
        setCart2(response.data.cart);
        setCart(response.data.cart.items);
      } else {
        console.log("Failed in updating!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (productId) => {
    let val = localStorage.getItem("userAuth");
    val = JSON.parse(val);
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/cart-item/cart/${val.user.id}/${productId}`
      );
      if (response.data.success) {
        setCart(response.data.cart.items);
      } else {
        console.log("Failed in deleting!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let val = localStorage.getItem("userAuth");
      val = JSON.parse(val);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/cart-item/cart/${val.user.id}`
        );
        if (response.data.success) {
          setCart2(response.data.cart);
          setCart(response.data.cart.items);
        } else {
          console.log("Failed in fetching!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [val]);

  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const placeOrder = async () => {
    let val = localStorage.getItem("userAuth");
    val = JSON.parse(val);
    const address = val?.user?.address;
    if (cart?.length === 0) {
      messageApi.open({
        type: "error",
        content: "Please Add Products",
      });
    } else if (address === "") {
      messageApi.open({
        type: "success",
        content: "Your Order is With Us!",
      });
      navigate("/user/profile");
    } else {
      messageApi.open({
        type: "success",
        content: "Address is already saved with us!",
      });
      try {
        const response = await axios.post(
          `http://localhost:8000/api/order/orders`,
          { id: cart2._id }
        );

        if (response.data.success) {
          setCart([]);
          messageApi.open({
            type: "success",
            content: "Order has been placed successfully! Check your Orders",
          });
          navigate("/vendor-dashboard/all-order")
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedItem, setEditedItem] = useState({});

  // setVal(editedItem.quantity)

  const openEditModal = (item) => {
    setEditedItem(item);
    setCounter(item.quantity);
    setIsModalOpen(true);
  };

  const handleEditOk = async () => {
    setVal(val + 1);
    setIsModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Middle cart={cart}>
      {contextHolder}
      <div className="container-fluid">
        <div className="row" style={{ height: "500px" }}>
          <div
            className="col-7"
            style={{ boxShadow: "1px 1px 10px 1px lightgray" }}
          >
            <div
              className="col-12"
              style={{ height: "350px", overflow: "scroll", marginTop: "20px" }}
              class="scrollBar"
            >
              {cart.map((item, index) => (
                <Row gutter={16} key={index}>
                  <Col span={8}>
                    <Card
                      hoverable
                      style={{
                        width: 250,
                        height: 300,
                      }}
                      cover={
                        <Carousel autoplay>
                          {item.image ? (
                            item.image.map((imageUrl, index) => (
                              <div key={index}>
                                <img
                                  src={imageUrl}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                  }}
                                />
                              </div>
                            ))
                          ) : (
                            <div>No images available.</div>
                          )}
                        </Carousel>
                      }
                    ></Card>
                  </Col>
                  <Col span={8} style={{ flexDirection: "column" }}>
                    <Card
                      title={item.name}
                      bordered={false}
                      style={{ fontSize: "25px" }}
                    >
                      &#8377;{item.price}
                    </Card>

                    <div>
                      <Popover
                        content={
                          <Button
                          type="primary"
                            onClick={() => {
                              handleDelete(item.productId);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            Ok
                          </Button>
                        }
                        title="Confirm"
                        trigger="click"
                        open={open}
                        onOpenChange={handleOpenChange}
                      >
                        <Button
                          type="primary"
                          danger
                          style={{ float: "right" }}
                        >
                          <i className="fa-sharp fa-solid fa-trash"></i>
                        </Button>
                      </Popover>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          fontSize: "20px",
                        }}
                      >
                        <span style={{ float: "right", fontSize: "15px" }}>
                          <Button
                            className="primary"
                            type="primary"
                            value="Input"
                            onClick={() => openEditModal(item)}
                          >
                            Edit Details
                          </Button>
                          <Modal
                            style={{
                              alignItems: "center",
                              width: "100px",
                            }}
                            title={editedItem._id}
                            open={isModalOpen}
                            onOk={handleEditOk}
                            onCancel={handleEditCancel}
                          >
                            <Carousel autoplay>
                              {item.image.map((i, index) => {
                                return (
                                  <div key={index}>
                                    <img src={i} style={{ width: "300px",marginLeft:"80px" }} />
                                  </div>
                                );
                              })}
                            </Carousel>
                            <h1 style={{ textAlign: "left" }}>
                              Title: {editedItem.name} <br />
                              <span
                                style={{
                                  fontSize: "20px",
                                  fontWeight: "100",
                                }}
                              >
                                Description: {editedItem.des}
                              </span>
                            </h1>
                            <h3> &#8377;{editedItem.price}</h3>
                            <div style={{ display: "flex", gap: "5px" }}>
                              <button
                                className="btn btn-primary"
                                type="button"
                                value="Input"
                                onClick={() => {
                                  setCounter(counter - 1);
                                  handleClick2();
                                }}
                                disabled={counter <= 1}
                              >
                                -
                              </button>

                              <h5>{counter}</h5>
                              <button
                                className="btn btn-primary"
                                type="button"
                                value="Input"
                                onClick={() => {
                                  setCounter(counter + 1);
                                  handleClick1();
                                }}
                                disabled={counter >= 10}
                              >
                                +
                              </button>
                            </div>
                          </Modal>
                        </span>
                      </div>
                    </div>
                  </Col>
                </Row>
              ))}
            </div>
            <hr style={{ border: "1px solid black" }} />

            <Popover
              content={
                <>
                  <Button onClick={placeOrder} style={{ cursor: "pointer",borderRadius:"0",margin:"1px" }} type="primary">
                    Buy
                  </Button>
                  <Button
                  type="primary"
                    onClick={() => navigate("/user/profile")}
                    style={{ cursor: "pointer",borderRadius:"0" ,margin:"1px" }}
                  >
                    Change Address
                  </Button>
                </>
              }
              title="Confirm"
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
            >
              <Button
                type="primary"
                size="large"
                style={{ float: "right" }}
                danger
              >
                Place Order
              </Button>
            </Popover>
          </div>
          <div className="col-4">
            <div
              className="col-12"
              style={{
                boxShadow: "1px 1px 10px 1px lightgray",
                padding: "5px",
                height: "300px",
              }}
            >
              <h5 style={{ color: "gray", margin: "20px" }}>Price Details</h5>
              <hr />
              <p
                style={{
                  color: "gray",
                  marginLeft: "20px",
                  textAlign: "left",
                  height: "40px",
                }}
              >
                <span style={{ float: "left" }}>
                  Price ({cart?.length} items)
                </span>
                <span style={{ float: "right", fontSize: "20px" }}>
                  &#8377;&nbsp;{cart2.bill}
                </span>
              </p>
              <hr />
              <p
                style={{
                  color: "gray",
                  marginLeft: "20px",
                  textAlign: "left",
                  height: "40px",
                }}
              >
                <span style={{ float: "left" }}>Discount</span>
                <span
                  style={{ float: "right", fontSize: "20px", color: "green" }}
                >
                  {cart2.bill >= 500 ? (
                    <Select
                      defaultValue="Coupons"
                      style={{
                        width: 120,
                      }}
                      onChange={handleChange}
                      options={[
                        {
                          value: "5",
                          label: "5%",
                        },
                        {
                          value: "10",
                          label: "10%",
                        },
                        {
                          value: "disabled",
                          label: "100%",
                          disabled: true,
                        },
                      ]}
                    />
                  ) : (
                    <Tag color="#108ee9">Add Product to unlock coupons</Tag>
                  )}
                </span>
              </p>
              <hr />
              <h5 style={{ color: "gray", margin: "20px" }}>
                <span style={{ float: "left" }}>Total Amount</span>
                <span style={{ float: "right" }}>
                  &#8377;&nbsp;{(Number(cart2.bill) * dis) / 100 || cart2.bill}
                </span>
              </h5>
            </div>
            <p
              style={{
                fontSize: "18px",
                textAlign: "left",
                marginLeft: "20px",
              }}
            >
              <i className="fa-sharp fa-solid fa-shield"></i> &nbsp;Safe and
              Secure Payments. Easy returns. 100% Authentic products.
            </p>
          </div>
        </div>
      </div>
    </Middle>
  );
};

export default Cart;
