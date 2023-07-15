import React, { useState, useEffect } from "react";
import Middle from "../Middle";
import { Button, Select } from "antd";
import axios from "axios";
import { message, Modal } from "antd";
import VendorPannel from "./VendorPannel";

const AllOrder = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [isCancelButtonDisabled, setIsCancelButtonDisabled] = useState(false);
  const [order, setOrder] = useState([]);

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
      // Replace with the authenticated user's ID
      const data = await axios.get(
        `http://localhost:8000/api/order/orders/get-orders?sellerId=${val.user.id}`
      );
      console.log(data.data); // Log the fetched data for debugging purposes
      messageApi.open({
        type: "success",
        content: "All orders fetched Successfully",
      });
      if (data.data.success) {
        setOrder(data.data.orders);
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
            <h2>All Orders</h2>
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
                  orderItem.items.map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <th scope="row">{index}</th>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>
                        {item.status === 0
                          ? "Cancelled"
                          : item.status === 1
                          ? "Processing"
                          : item.status === 2
                          ? "Delivered"
                          : item.status === 3
                          ? "Disabled"
                          : item.status === 4
                          ? "Shipped"
                          : item.status === 5
                          ? "on the way"
                          : item.status === 6 && "Active"}
                      </td>
                      <td>
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
                      </td>
                      <td>
                        <Button type="primary" onClick={showModal}>
                          User Details
                        </Button>
                        <Modal
                          title="User Details"
                          open={isModalOpen}
                          onOk={handleOk}
                          onCancel={handleCancel}
                        >
                          {
                            <div>
                              <p> Name: {item.userDetails.name}</p>
                              <p> Email: {item.userDetails.nemailame}</p>
                              <p> Phone: {item.userDetails.phone}</p>
                              <p> Address: {item.userDetails.address}</p>
                            </div>
                          }
                        </Modal>
                      </td>
                    </tr>
                  ))
                )}

                {/* <tr>
                  <th scope="row">1</th>
                  <td>Shirt</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <Select
                    defaultValue="Active"
                    style={{
                      width: 120,
                    }}
                    onChange={handleChange}
                    options={option}
                    disabled
                  />
           
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Middle>
  );
};

export default AllOrder;
