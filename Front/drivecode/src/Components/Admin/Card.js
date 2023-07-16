import React, { useState } from "react";
import { Button, Card, Carousel, Modal, Select, Tag, message } from "antd";
import Meta from "antd/es/card/Meta";
import axios from "axios";
const Cards = ({
  name,
  des,
  category,
  price,
  pid,
  quantity,
  addedBy,
  orders,
  status,
  newstatus,
  image
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newDes, setNewDes] = useState(des);
  const [newStatus, setNewStatus] = useState(newstatus);
  const [newPrice, setNewPrice] = useState(price);
  const [newQuantity, setNewQuantity] = useState(quantity);
  const showModal = () => {
    setOpen(true);
  };

  const handleChange = (value) => {
    setNewStatus(value);
  };
  const [messageApi, contextHolder] = message.useMessage();
  const success = async () => {
    try {
      const data = await axios.post(
        `http://localhost:8000/api/product/delete-product`,
        { id: pid }

      );

      if (data.data.success) {
        messageApi.open({
          type: "success",
          content: `${data.data.message}`,
        });
      } else {
        messageApi.open({
          type: "warning",
          content: `${data.data.message}`,
        });
      }
    } catch (error) {
      messageApi.open({
        type: "warning",
      });
    }
  };

  const handleOk = async () => {
    setConfirmLoading(true);

    try {
      const data = await axios.put(
        `http://localhost:8000/api/product/update-product/${pid}`,
        {
          name: newName,
          des: newDes,
          quantity: newQuantity,
          price: newPrice,
          status: newStatus,
          category: category,
        }
      );
      if (data.data.success) {
        messageApi.open({
          type: "success",
          content: `${data.data.message}`,
        });
      } else {
        messageApi.open({
          type: "warning",
          content: `${data.data.message}`,
        });
      }
    } catch (error) {
      messageApi.open({
        type: "warning",
      });
    }
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  return (
    <Card
      hoverable
      style={{ width: 300, height: 500, margin: "10px" }}
      cover={
        <Carousel autoplay>

          {image.map((i, index) => {
            return (
              <div key={index}>
                <img src={i} style={{ width: "300px" }} />
              </div>
            );
          })}
        </Carousel>
      }
    >
      {contextHolder}

      <h4 style={{ textAlign: "left" }}>&#x20B9;{price}</h4>

      <Meta title={name} description={des} />
      <Tag color="blue" style={{ fontSize: "10px", marginTop: "5px" }}>
        AddedBy: {addedBy}
      </Tag>
      <Tag color="blue" style={{ fontSize: "10px", marginTop: "5px" }}>
        Orders: {orders}
      </Tag>
      <Tag color="blue" style={{ fontSize: "10px", marginTop: "5px" }}>
        status: {status}
      </Tag>

      <p style={{ fontSize: "20px" }}>
        <i
          class="fa-sharp fa-solid fa-pen-to-square"
          onClick={showModal}
          style={{ float: "left" }}
        ></i>
        <Modal
          title="Title"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <div className="form-group">
            <label for="exampleFormControlInput1">Product Name</label>
            <input
              type="text"
              className="form-control"
              value={newName}
              id="exampleFormControlInput1"
              onChange={(e) => {
                setNewName(e.target.value);
              }}
            />
            <label for="exampleFormControlInput1">Price</label>

            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              value={newPrice}
              onChange={(e) => {
                setNewPrice(e.target.value);
              }}
            />
            <label for="exampleFormControlSelect1">Select quantity</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              value={Option.value}
              onChange={(e) => {
                setNewQuantity(e.target.value);
              }}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>

          <div className="form-group">
            <label for="exampleFormControlTextarea1">Description</label>
            <textarea
              onChange={(e) => {
                setNewDes(e.target.value);
              }}
              value={des}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <div style={{ display: "flex" }}>
            <input
              onChange={(e) => {
                if (e.target.files[0]) {
                  //   setP2({
                  //     src: URL.createObjectURL(e.target.files[0]),
                  //     alt: e.target.files[0].name,
                  //   });
                }
              }}
              type="file"
              className="form-control-file"
              id="exampleFormControlFile1"
              style={{ border: "none", height: "50px" }}
            />
          </div>
          <Select
            defaultValue="Select a value"
            value={newStatus}
            onChange={handleChange}
            style={{
              width: 120,
            }}
            options={[
              {
                value: 1,
                label: "Draft",
              },
              {
                value: 0,
                label: "Publish",
              },
            ]}
          />
        </Modal>
        <i
          class="fa-sharp fa-solid fa-trash"
          style={{ float: "right" }}
          onClick={success}
        ></i>
      </p>
    </Card>
  );
};

export default Cards;
