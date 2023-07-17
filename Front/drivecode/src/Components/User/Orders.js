import React, { useState, useEffect } from "react";
import UserPannel from "./UserPannel";
import Middle from "../Middle";
import { Button } from "antd";
import axios from "axios";
import { message } from "antd";

const Orders = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [isCancelButtonDisabled, setIsCancelButtonDisabled] = useState(false);
  const [order, setOrder] = useState([]);

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
        `http://localhost:8000/api/order/orders/${val?.user?.id}`
      );
      messageApi.open({
        type: "success",
        content: "All orders fetched",
      });
      if (data.data.success) {
        setOrder(data.data.orders);
      }
    };
    fetchedData();
  }, []);

  const handleCancel = async (orderIndex, itemIndex) => {
    try {
      // Create a copy of the order state
      const updatedOrder = [...order];

      // Update the status of the item to "Cancelled"
      updatedOrder[orderIndex].items[itemIndex].status = 0;

      // Update the order state with the modified order
      setOrder(updatedOrder);

      // Make API call to update the status
      await axios.put(
        `http://localhost:8000/api/order/update-status/${updatedOrder[orderIndex]._id}/${updatedOrder[orderIndex].items[itemIndex]._id}`,
        { status: 0 }
      );

      messageApi.success("Order cancelled successfully");
    } catch (error) {
      console.error(error);
      messageApi.error("Failed to cancel the order");
    }
  };

  return (
    <Middle>
      {contextHolder}

      <div className="container">
        <div className="row mt-5">
          <UserPannel />
          <div className="col-8">
            <h2>Your Orders</h2>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                
                </tr>
              </thead>
              <tbody>
                {order?.map((orderItem, orderIndex) =>
                  orderItem.items.map((item, itemIndex) => (
                    <tr key={itemIndex}>
                      <th scope="row">{orderIndex}</th>
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
                          : item.status === 6
                          && "Active"
                          }
                      </td>
                      <td>
                        <Button
                          type="primary"
                          danger
                          disabled={isCancelButtonDisabled || item.status===0 || item.status===2}
                          
                          onClick={() => handleCancel(orderIndex, itemIndex)}
                        >
                          Cancel
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Middle>
  );
};

export default Orders;
