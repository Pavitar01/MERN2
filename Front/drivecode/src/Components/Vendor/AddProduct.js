import React, { useEffect, useState } from "react";
import Middle from "../Middle";
import AdminPannel from "../Admin/AdminPannel";
import axios from "axios";
import { Modal, Upload } from "antd";
import { Select } from "antd";
import { useAuth } from "../../Auth/Index";
import VendorPannel from "./VendorPannel";
const { Option } = Select;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const AddProducts = () => {
  const [cat, setCat] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");

  const [des, setDes] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [Err, setErr] = useState("");
  const [auth, setAuth] = useAuth();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [details, setDetails] = useState([]);

  //image upload
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  //useEffect

  useEffect(() => {
    const a = async () => {
      let val = localStorage.getItem("userAuth");
      val = JSON.parse(val);
      try {
        const data = await axios.post(
          "http://localhost:8000/api/product/get-vendor-by-id",
          { id: val.user.id }
        );
        if (data?.data?.success) {
          setDetails(data.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    a();
  }, []);
  //handlesubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        !name ||
        !des ||
        !price ||
        !quantity
        // photo === null ||
        // p2 === null ||
        // p3 === null ||
        // p4 == null
      ) {
        setErr("all feilds are required !");
      }
      const data = await axios.post(
        "http://localhost:8000/api/product/create-product",
        {
          name,
          image: null,
          des,
          price,
          status: 0,
          quantity,
          category,
          Addedby: details._id,
          order: 0,
        }
      );
      if (data.data.success) {
        setErr("Product Added Successfully !");

        // setFileList(null);
        setQuantity(1);
        setName("");
        setDes("");
        setPrice("");
      } else {
        setErr(data.data.message);
      }
    } catch (err) {
      setErr("Something went Wrong!");
    }
  };
  const onhandledraft = async (e) => {
    e.preventDefault();

    try {
      if (
        !name ||
        !des ||
        !price ||
        !quantity||
        !category
        // photo === null ||
        // p2 === null ||
        // p3 === null ||
        // p4 == null
      ) {
        setErr("all feilds are required !");
      }

      const data = await axios.post(
        "http://localhost:8000/api/product/create-product",
        {
          name,
          image: null,
          des,
          price,
          status: 1,
          quantity,
          category,
          addedby: auth?.user?.email,
          order: 0,
        }
      );
      if (data.data.success) {
        setErr("Product Added Successfully !");

        // setFileList(null);
        setQuantity(1);
        setName("");
        setDes("");
        setPrice("");
      } else {
        setErr(data.data.message);
      }
    } catch (err) {
      setErr("Something went Wrong!");
    }
  };

  useEffect(() => {
    const a = async () => {
      try {
        const data = await axios.get(
          "http://localhost:8000/api/category/all-categories"
        );
        if (data?.data?.success) {
          setCat(data?.data?.category);
        }
      } catch (error) {
        console.log(error);
      }
    };
    a();
  }, []);
  return (
    <Middle>
      <div className="container" style={{ display: "flex", width: "100%" }}>
        <div className="row  mt-5">
          <VendorPannel />
          <div
            className="col-5"
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <h1
              style={{ textAlign: "left", height: "80px", marginLeft: "20px" }}
            >
              Add Products
            </h1>
            <div className="w-50">
              <form onSubmit={handleSubmit} style={{ width: "390px" }}>
                <Select
                  bordered={true}
                  placeholder="Select a category"
                  size="large"
                  className="form-select mb-3 w-50"
                  showSearch
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {cat?.map((i, index) => {
                    return (
                      <Option key={index} value={i.name}>
                        {i.name}
                      </Option>
                    );
                  })}
                </Select>
                <div className="form-group">
                  <label for="exampleFormControlInput1">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    id="exampleFormControlInput1"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <label for="exampleFormControlInput1">Price</label>

                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                  <label for="exampleFormControlSelect1">Select quantity</label>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    value={Option.value}
                    onChange={(e) => {
                      setQuantity(e.target.value);
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
                      setDes(e.target.value);
                    }}
                    value={des}
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
                <div style={{ display: "flex" }}>
                  <Upload
                    action="" //image
                    listType="picture-circle"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                  <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img
                      alt="example"
                      style={{
                        width: "100%",
                      }}
                      src={previewImage}
                    />
                  </Modal>
                </div>
                <p>{Err}</p>
                <button
                  type="submit"
                  className="btn btn-primary mb-2"
                  style={{ width: "50%" }}
                >
                  Add Product
                </button>
                <button
                  onClick={onhandledraft}
                  className="btn btn-danger mb-2"
                  style={{ width: "50%" }}
                >
                  Draft Product
                </button>
              </form>
            </div>
          </div>
          {/* <img src="https://th.bing.com/th/id/OIP.gRKRV2CE6NViDJXwdJOziQHaH4?pid=ImgDet&rs=1" alt="img" style={{width:"200px",height:"200px"}}/> */}
        </div>
      </div>
    </Middle>
  );
};

export default AddProducts;
