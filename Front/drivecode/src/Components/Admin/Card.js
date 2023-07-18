import React, { useEffect, useState } from "react";
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
  outstock,
  image,
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newDes, setNewDes] = useState(des);
  const [newStatus, setNewStatus] = useState(newstatus);
  const [newPrice, setNewPrice] = useState(price);
  const [newQuantity, setNewQuantity] = useState(quantity);
  const [currentImages, setCurrentImages] = useState(image);
  const [outStock, setOutStock] = useState(outstock);
  const [updatedImages, setUpdatedImages] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    setCurrentImages(image);
  }, [image]);

  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    setCurrentImages(image);
  }, [image]);

  const handleChange = (value) => {
    setNewStatus(value);
  };
  const handleStockChange = async(value) => {
    const data = await axios.post(
      "http://localhost:8000/api/product/stock-handler",
      { id: pid, value }
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
  };
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

  const image_to_base64 = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });
  };

  const handlePhotoUpload = (e) => {
    const fileArray = Array.from(e.target.files).map((file) => ({
      src: URL.createObjectURL(file),
      alt: file.name,
      file, // Store the File object for later use.
    }));
    setUpdatedImages(fileArray);
  };

  const handleOk = async () => {
    setConfirmLoading(true);

    // Create a new array with the updated images and the current images.
    const mergedImages = [...updatedImages, ...currentImages];

    const photoBase64Array = await Promise.all(
      mergedImages.map(async (photo) => {
        if (photo.file) {
          try {
            const imageFile = await fetch(photo.src).then((response) =>
              response.blob()
            );
            const photoBase64 = await image_to_base64(imageFile);
            return photoBase64;
          } catch (error) {
            console.log("Error converting image to Base64:", error);
          }
        } else {
          // If the photo is not a File object, it's already a Base64 string.
          return photo.src;
        }
      })
    );
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
          images: photoBase64Array,
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
                <img src={i} style={{ width: "300px", height: "250px" }} />
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
              type="number"
              className="form-control"
              id="exampleFormControlInput1"
              value={newPrice}
              onChange={(e) => {
                setNewPrice(e.target.value);
              }}
            />
            <label for="exampleFormControlSelect1">Update quantity</label>

            <input
              type="number"
              className="form-control"
              id="exampleFormControlInput1"
              value={newPrice}
              onChange={(e) => {
                setNewQuantity(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label for="exampleFormControlTextarea1">Description</label>
            <textarea
              onChange={(e) => {
                setNewDes(e.target.value);
              }}
              value={newDes}
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <div>
            <p>Current Image:</p>
            {currentImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Current Image ${index}`}
                style={{ width: "100px", height: "100px", marginRight: "10px" }}
              />
            ))}
          </div>
          <div style={{ display: "flex" }}>
            <input
              onChange={handlePhotoUpload}
              type="file"
              multiple
              className="form-control-file"
              id="productImages"
              style={{
                border: "none",
                height: "50px",
                border: "1px solid gray",
              }}
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
        <Select
          defaultValue={outStock===1?"Out of Stock":"Have Stocks"}
          value={outStock}
          onChange={handleStockChange}
          style={{
            width: 120,
          }}
          options={[
            {
              value: 1,
              label: "Out of Stocks",
            },
            {
              value: 0,
              label: "Have Stocks",
            },
          ]}
        />
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
