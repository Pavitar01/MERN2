import React, { useState, useEffect } from "react";
import { Button, Select } from "antd";
import {Modal } from "antd";


const OrderHistory = ({order}) => {

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
    let val=localStorage.getItem("userAuth");
    val=JSON.parse(val)
  return (
    <div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Status</th>
           {val.user.role===1 &&  <th scope="col">Details</th>    }
          </tr>
        </thead>
        <tbody>
          {order?.map((orderItem, index) =>
            orderItem.items.map((item, itemIndex) => {
              if (item.status === 2) {
                return (
                  <tr key={itemIndex}>
                    <th scope="row">#</th>
                    <td>{item.name}</td>
                    <td>₹ {item.price}</td>
                    <td>{item.quantity}</td>
                    <td>Delivered</td>
                {
                    val.user.role===1 && (<>
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
                            <span style={{ float: "left", fontWeight: "600" }}>
                              Name:
                            </span>
                            {item.userDetails.name}
                          </p>
                          <p style={{ width: "100%" }}>
                            <span style={{ float: "left", fontWeight: "600" }}>
                              Email:
                            </span>
                            {item.userDetails.email}
                          </p>
                          <p style={{ width: "100%" }}>
                            <span style={{ float: "left", fontWeight: "600" }}>
                              Phone:
                            </span>
                            {item.userDetails.phone}
                          </p>
                          <p style={{ width: "100%" }}>
                            <span style={{ float: "left", fontWeight: "600" }}>
                              Address:
                            </span>
                            {item.userDetails.address}
                          </p>
                        </div>
                      </Modal>
                    </td>
                    </>)
                }
                  </tr>
                );
              }
              return null; // Skip non-delivered items
            })
          )}
        </tbody>
      </table>

    </div>
  )
}

export default OrderHistory
