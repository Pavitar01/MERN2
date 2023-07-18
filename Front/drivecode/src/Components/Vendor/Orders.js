import React, { useState, useEffect } from "react";
import Middle from "../Middle";
import { Button, Select } from "antd";
import axios from "axios";
import { message, Modal } from "antd";
import VendorPannel from "./VendorPannel";
import OrderHistory from "../../Pages/OrderHistory";

const AllOrder = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [isCancelButtonDisabled, setIsCancelButtonDisabled] = useState(false);
  const [order, setOrder] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = async (value, orderIndex, itemIndex) => {
    // Create a copy of the order state
    const updatedOrder = [...order];

    // Update the status of the specific item
    updatedOrder[orderIndex].items[itemIndex].status = value;

    // Update the order state with the modified order
    setOrder(updatedOrder);

    // Make API call to update the status
    try {
      const orderId = updatedOrder[orderIndex]._id;
      const itemId = updatedOrder[orderIndex].items[itemIndex]._id;

      // Make the API call to update the status
      const response = await axios.put(
        `http://localhost:8000/api/order/update-status/${orderId}/${itemId}`,
        { status: value }
      );
      console.log(response.data); // Log the response for debugging purposes
      if (response.data.message) {
        messageApi.open({
          type: "info",
          content: `${response.data.message}`,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  //delivered Products :

  useEffect(() => {
    const disableCancelButton = setTimeout(() => {
      setIsCancelButtonDisabled(true);
    }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

    return () => {
      clearTimeout(disableCancelButton);
    };
  }, []);

  useEffect(() => {
    const fetchedData = async () => {
      let val = localStorage.getItem("userAuth");
      val = JSON.parse(val);
      const data = await axios.get(
        `http://localhost:8000/api/order/orders/seller/${val.user.id}`
      );

      if (data.data.success) {
        messageApi.open({
          type: "success",
          content: "All orders fetched Successfully",
        });
        setOrder(data.data.orders);
        setTotalEarnings(data.data.totalEarnings);
      }
    };
    fetchedData();
  }, []);

  const option = [
    {
      value: "0",
      label: "Cancelled",
    },
    {
      value: "1",
      label: "Processing",
    },
    {
      value: "2",
      label: "Delivered",
    },
    {
      value: "3",
      label: "Disabled",
    },
    {
      value: "4",
      label: "Shipped",
    },
    {
      value: "5",
      label: "On the way",
    },
    {
      value: "6",
      label: "Active",
    },
  ];

  return (
    <Middle>
      {contextHolder}

      <div className="container">
        <div className="row  mt-5">
          <VendorPannel />
          <div className="col-8">
            <h2 style={{ color: "gray" }}>Arrival Orders</h2>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">status</th>
                  <th scope="col">Action</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {order?.map((orderItem, index) =>
                  orderItem.items.map((item, itemIndex) => {
                    // Check if the item status is neither canceled (0) nor delivered (2)
                    if (item.status !== 2) {
                      return (
                        <tr key={itemIndex}>
                          <th scope="row">#</th>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>
                            {item.status === 1
                              ? "Processing"
                              : item.status === 3
                              ? "Disabled"
                              : item.status === 4
                              ? "Shipped"
                              : item.status === 5
                              ? "on the way"
                              : item.status === 0
                              ? "Cancelled"
                              : item.status === 6 && "Active"}
                          </td>
                          <td>
                            {item.status !== 0 ? (
                              <Select
                                defaultValue="Active"
                                style={{
                                  width: 120,
                                }}
                                onChange={(value) =>
                                  handleChange(value, index, itemIndex)
                                }
                                options={option}
                              />
                            ):"Refunded"}
                          </td>
                          <td>
                            <Button type="primary" onClick={showModal}>
                              Open Modal
                            </Button>
                            <Modal
                              title="User Details"
                              open={isModalOpen}
                              onOk={handleOk}
                              onCancel={handleCancel}
                            >
                              <div>
                                <p style={{ width: "100%" }}>
                                  <span
                                    style={{ float: "left", fontWeight: "600" }}
                                  >
                                    Name:
                                  </span>
                                  {item.userDetails.name}
                                </p>
                                <p style={{ width: "100%" }}>
                                  <span
                                    style={{ float: "left", fontWeight: "600" }}
                                  >
                                    Email:
                                  </span>
                                  {item.userDetails.email}
                                </p>
                                <p style={{ width: "100%" }}>
                                  <span
                                    style={{ float: "left", fontWeight: "600" }}
                                  >
                                    Phone:
                                  </span>
                                  {item.userDetails.phone}
                                </p>
                                <p style={{ width: "100%" }}>
                                  <span
                                    style={{ float: "left", fontWeight: "600" }}
                                  >
                                    Address:
                                  </span>
                                  {item.userDetails.address}
                                </p>
                              </div>
                            </Modal>
                          </td>
                        </tr>
                      );
                    }
                  })
                )}
              </tbody>
            </table>
            <h2 style={{ color: "gray" }}>Order History</h2>
            <OrderHistory order={order} />
            <table class="table">
              <thead class="thead-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Total Orders</th>
                  <th scope="col">Total Earning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#</td>
                  <td>
                    <h3>{order.length}</h3>
                  </td>
                  <td>
                    <h3> &#8377; {totalEarnings}</h3>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Middle>
  );
};

export default AllOrder;
