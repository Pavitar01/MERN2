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
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [cart2, setCart2] = useState([]);
  const [dis, setDis] = useState(0);
  const [counter, setCounter] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();
  const handleChange = (value) => {
    setDis(value);
  };
  const navigate = useNavigate();
  const handleClick1 = () => {
    // Counter state is incremented
    setCounter(counter + 1);
  };

  // Function is called everytime decrement button is clicked
  const handleClick2 = () => {
    // Counter state is decremented
    setCounter(counter - 1);
  };

  const handleDelete = async (i) => {
    let val = localStorage.getItem("userAuth");
    val = JSON.parse(val);
    const data = await axios.delete(
      `http://localhost:8000/api/cart-item/cart/${val.user.id}/${i.productId}`
    );
    if (data.data.success) {
      setCart(data.data.cart.items);
    } else {
      console.log("Failed in deleting!");
    }
  };

  useEffect(() => {
    const a = async () => {
      let val = localStorage.getItem("userAuth");
      val = JSON.parse(val);
      const data = await axios.get(
        `http://localhost:8000/api/cart-item/cart/${val.user.id}`
      );
      if (data.data.success) {
        setCart2(data.data.cart);
        setCart(data.data.cart.items);
      } else {
        console.log("Failed in fetching!");
      }
    };

    a();
  }, []);
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
    } else if (address == "") {
      messageApi.open({
        type: "success",
        content: "your Order is With Us !",
      });
      navigate("/user/profile");
    } else {
      messageApi.open({
        type: "success",
        content: "Address is already saved with us!",
      });
      try {
        const data = await axios.post(
          `http://localhost:8000/api/order/orders`,
          { id: cart2._id }
        );

        if (data.data.success) {
          setCart([]);
          messageApi.open({
            type: "success",
            content: "Order has placed successFully!, Check your Orders",
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  //open modal for edit

  //modal

  const [newProd, setNewProd] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  const [mod, setMod] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Open = (e) => {
    messageApi.open({
      type: "success",
      content: "Success",
    });
    setMod(e);
    setIsModalOpen(true);
    setNewPrice(e.price);
    setNewProd(e.productId);
    setNewQuantity(e.quantity);
  };

  const handleOk = async (e) => {
    let val = localStorage.getItem("userAuth");
    val = JSON.parse(val);
    const data = await axios.put(
      `http://localhost:8000/api/cart-item/cart/${val.user.id}`,
      { productId: newProd, quantity: parseInt(newQuantity) }
    );
    if (data.data.success) {
      setCart2(data.data.cart);
      setCart(data.data.cart.items);
    } else {
      console.log("Failed in fetching!");
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Middle cart={cart}>
      {contextHolder}
      <div class="container-fluid">
        <div class="row" style={{ height: "500px" }}>
          <div
            class="col-7"
            style={{ boxShadow: "1px 1px 10px 1px lightgray" }}
          >
            <div
              class="col-12"
              style={{ height: "350px", overflow: "scroll", marginTop: "20px" }}
              className="scrollBar"
            >
              {cart.map((i, index) => {
                return (
                  <>
                    <Row gutter={16}>
                      <Col span={8}>
                        <Card
                          hoverable
                          style={{
                            width: 250,
                            height: 300,
                          }}
                          cover={
                            <img
                              alt="example"
                              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                            />
                          }
                        ></Card>
                      </Col>
                      <Col span={8} style={{ flexDirection: "column" }}>
                        <Card
                          title={i.name}
                          bordered={false}
                          style={{ fontSize: "25px" }}
                        >
                          &#8377;{i.price}
                        </Card>

                        <div>
                          <Popover
                            content={
                              <button
                                onClick={() => {
                                  handleDelete(i);
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                Ok
                              </button>
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
                              <i class="fa-sharp fa-solid fa-trash"></i>
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
                                class="primary"
                                type="primary"
                                value="Input"
                                onClick={() => Open(i)}
                              >
                                Edit Details
                              </Button>
                              <Modal
                                style={{
                                  alignItems: "center",
                                  width: "100px",
                                }}
                                title="Basic Modal"
                                open={isModalOpen}
                                onOk={() => {
                                  handleOk();
                                }}
                                onCancel={handleCancel}
                              >
                                <img
                                  alt="example"
                                  src="https://th.bing.com/th/id/OIP.4gizB9_xXckR4sDo9OoOHwHaHa?pid=ImgDet&rs=1"
                                  width={200}
                                  height={200}
                                />
                                <h1 style={{ textAlign: "left" }}>
                                  Title:{mod.name} <br />
                                  <span
                                    style={{
                                      fontSize: "20px",
                                      fontWeight: "100",
                                    }}
                                  >
                                    description:{mod.des}
                                  </span>
                                </h1>
                                <h3> &#8377;{mod.price}</h3>
                                <div style={{ display: "flex", gap: "5px" }}>
                                  <button
                                    class="btn btn-primary"
                                    type="button"
                                    value="Input"
                                    onClick={handleClick2}
                                    disabled={counter ? true : false}
                                  >
                                    -
                                  </button>
                                  <h5>{counter}</h5>
                                  <button
                                    class="btn btn-primary"
                                    type="button"
                                    value="Input"
                                    onClick={handleClick1}
                                    disabled={counter >= 10 ? true : false}
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
                  </>
                );
              })}
            </div>
            <hr style={{ border: "1px solid black" }} />

            <Popover
              content={
                <>
                  <button onClick={placeOrder} style={{ cursor: "pointer" }}>
                    Buy
                  </button>
                  <button
                    onClick={() => navigate("/user/profile")}
                    style={{ cursor: "pointer" }}
                  >
                    Change Address
                  </button>
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
          <div class="col-4">
            <div
              class="col-12"
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
                  Price ( {cart?.length} items )
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
                  &#8377; &nbsp;{(Number(cart2.bill) * dis) / 100 || ""}
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
              <i class="fa-sharp fa-solid fa-shield"></i> &nbsp;Safe and Secure
              Payments.Easy returns.100% Authentic products.
            </p>
          </div>
        </div>
      </div>
    </Middle>
  );
};

export default Cart;
