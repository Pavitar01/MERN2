import React, { useEffect, useState } from "react";
import Middle from "../Middle";
import axios from "axios";
import { Select } from "antd";
import { useAuth } from "../../Auth/Index";
import AdminPannel from "./AdminPannel";

const { Option } = Select;

const AddProducts = () => {
  const [cat, setCat] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [Err, setErr] = useState("");
  const [auth] = useAuth();
  const [photos, setPhotos] = useState([]);

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
    }));
    setPhotos(fileArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!name || !des || !price || !quantity || photos.length === 0) {
        setErr("All fields are required!");
        return;
      } else if (name.trim() === "") {
        setErr("Name is required!");
        return;
      } else if (des.trim() === "") {
        setErr("Description is required!");
        return;
      }

      const photoBase64Array = await Promise.all(
        photos.map(async (photo) => {
          try {
            const imageFile = await fetch(photo.src).then((response) =>
              response.blob()
            );
            const photoBase64 = await image_to_base64(imageFile);
            return photoBase64;
          } catch (error) {
            console.log("Error converting image to Base64:", error);
          }
        })
      );
      let val = localStorage.getItem("userAuth");
      val = JSON.parse(val);
      const data = await axios.post(
        "http://localhost:8000/api/product/create-product",
        {
          name,
          images: photoBase64Array,
          des,
          price,
          status: 0,
          quantity,
          category,
          Addedby: val.user.id,
          order: 0,
        }
      );

      if (data.data.success) {
        setErr("Product Added Successfully!");
        setQuantity(1);
        setName("");
        setDes("");
        setPrice("");
        setPhotos([]);
      } else {
        setErr(data.data.message);
      }
    } catch (err) {
      setErr("Something went wrong!");
    }
  };

  const onhandledraft = async (e) => {
    e.preventDefault();

    try {
      if (
        !name ||
        !des ||
        !price ||
        !quantity ||
        !category ||
        photos.length === 0
      ) {
        setErr("All fields are required!");
        return;
      } else if (name.trim() === "") {
        setErr("Name is required!");
        return;
      } else if ( des.trim() === "") {
        setErr("Description is required!");
        return;
      }
      const photoBase64Array = await Promise.all(
        photos.map(async (photo) => {
          try {
            const imageFile = await fetch(photo.src).then((response) =>
              response.blob()
            );
            const photoBase64 = await image_to_base64(imageFile);
            return photoBase64;
          } catch (error) {
            console.log("Error converting image to Base64:", error);
          }
        })
      );
      let val = localStorage.getItem("userAuth");
      val = JSON.parse(val);
      const data = await axios.post(
        "http://localhost:8000/api/product/create-product",
        {
          name,
          images: photoBase64Array,
          des,
          price,
          status: 1,
          quantity,
          category,
          Addedby: val.user.id,
          order: 0,
        }
      );

      if (data.data.success) {
        setErr("Product Added Successfully!");
        setQuantity(1);
        setName("");
        setDes("");
        setPrice("");
        setPhotos([]);
      } else {
        setErr(data.data.message);
      }
    } catch (err) {
      setErr("Something went wrong!");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
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

    fetchCategories();
  }, []);

  return (
    <Middle>
      <div className="container" style={{ display: "flex", width: "100%" }}>
        <div className="row mt-5">
          <AdminPannel />
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
                  {cat?.map((category) => (
                    <Option key={category._id} value={category.name}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
                <div className="form-group">
                  <label htmlFor="productName">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    id="productName"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <label htmlFor="productPrice">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="productPrice"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                  <label htmlFor="productQuantity">Select quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    id="productQuantity"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="productDescription">Description</label>
                  <textarea
                    onChange={(e) => {
                      setDes(e.target.value);
                    }}
                    value={des}
                    className="form-control"
                    id="productDescription"
                    rows="3"
                  ></textarea>
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
        </div>
      </div>
    </Middle>
  );
};

export default AddProducts;
