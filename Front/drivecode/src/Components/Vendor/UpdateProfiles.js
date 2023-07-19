import React, { useEffect, useState } from "react";
import Middle from "../Middle";
import { useAuth } from "../../Auth/Index";
import { Button, Modal, message } from "antd";
import axios from "axios";
import VendorPannel from "./VendorPannel";
import { useNavigate } from "react-router-dom";
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

const UpdateProfiles = () => {
  const [auth, setAuth] = useAuth();
  const [all, setData] = useState("");
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [val, setVal] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.post("http://localhost:8000/api/auth/all-user", {
        email: auth?.user?.email,
      });
      setData(data.data);
    };
    fetchData();
  }, [val]);

  const [formData, setFormData] = useState({
    name: all.name,
    email: auth.user.email,
    phoneNumber: auth.user.phone,
    address: all.address,
    password: "",
    userType: 0,
    ans: "",
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [messageApi, contextHolder] = message.useMessage();
  const handleChange = async () => {
    let photoBase64 = null;
    if (imagePreview && imagePreview.src) {
      try {
        const imageFile = await fetch(imagePreview.src).then((response) =>
          response.blob()
        );
        photoBase64 = await image_to_base64(imageFile);
      } catch (error) {
        console.log("Error converting image to Base64:", error);
      }
    }

    const data = await axios.put(
      "http://localhost:8000/api/auth/update-logo",
      {
        logo: photoBase64,
        curreemail: auth?.user?.email,

      }
    );

    if (data.data.success) {
      messageApi.open({
        type: "success",
        content: "Logo updated successfully!",
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Error in updating Logo!",
      });
    }
  };

  const handleSubmit = async (e) => {
    setVal(val + 1);
    e.preventDefault();

    if (!formData.name || !formData.address) {
      messageApi.open({
        type: "warning",
        content: "Please fill in all fields!",
      });
    } 
    
    else if(formData.name.trim()==="" || formData.address.trim()===""){
      messageApi.open({
        type: "warning",
        content: "Please fill in all fields!",
      });
    }
    
    else {
      let photoBase64 = null;
      if (photo && photo.src) {
        try {
          const imageFile = await fetch(photo.src).then((response) =>
            response.blob()
          );
          photoBase64 = await image_to_base64(imageFile);
        } catch (error) {
          console.log("Error converting image to Base64:", error);
        }
      }

      const data = await axios.put(
        "http://localhost:8000/api/auth/update-profile",
        {
          curreemail: auth?.user?.email,
          email: formData.email,
          name: formData.name,
          phone: formData.phoneNumber,
          address: formData.address,
          photo: photoBase64,
        }
      );

      if (data.data.success) {
        messageApi.open({
          type: "success",
          content: "Profile updated successfully!",
        });
      } else {
        messageApi.open({
          type: "error",
          content: "Error in updating profile!",
        });
      }
    }
  };

  return (
    <Middle>
      {contextHolder}

      <div className="container">
        <div className="row  mt-7">
          <VendorPannel url={all.photo} />
          <div className="col-7" style={{ display: "flex" }}>
            <form onSubmit={handleSubmit}>
              <label>Upload Image</label>
              <input
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setPhoto({
                      src: URL.createObjectURL(e.target.files[0]),
                      alt: e.target.files[0].name,
                    });
                  }
                }}
                type="file"
                className="form-control-file"
                id="exampleFormControlFile1"
                style={{
                  border: "none",
                  height: "50px",
                  border: "1px solid gray",
                }}
              />
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="First and Last Name"
                value={formData.name}
                onChange={handleInputChange}
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={auth.user.email}
                readOnly
                onChange={handleInputChange}
              />

              <label>Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                placeholder="Phone Number"
                readOnly
                minLength={9}
                maxLength={10}
                value={auth.user.phone}
                onChange={handleInputChange}
              />

              <label>Address</label>
              <textarea
                name="address"
                placeholder="Address"
                style={{
                  width: "100%",
                  height: "44px",
                  resize: "none",
                  padding: "5px",
                }}
                value={formData.address}
                onChange={handleInputChange}
              ></textarea>

              <Button
                type="primary"
                onClick={() => {
                  navigate("/forget-pass");
                }}
              >
                setPass
              </Button>

              <input
                type="submit"
                value="Update Profile"
                style={{
                  marginBottom: "20px",
                  cursor: "pointer",
                  height: "50px",
                  marginTop: "10px",
                }}
              />
            </form>
            <div
              style={{ width: "300px", height: "80px", marginLeft: "20px" }}
              className="logoimg"
            >
            <h5 style={{marginTop:"-30px",color:"gray"}}>Choose</h5>
              <input
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setImagePreview({
                      src: URL.createObjectURL(e.target.files[0]),
                      alt: e.target.files[0].name,
                    });
                  }
                }}
                type="file"
                style={{
                  opacity:"0",
                  height:"100px",
                  border: "none",
                  cursor:"pointer"
                }}
              />
              <Button type="primary" onClick={handleChange} style={{width:"100%"}}>
                Upload
              </Button>
              {all.logo && (
                <img
                  src={all.logo || imagePreview}
                  alt="Preview"
                  style={{
                    width: "300px",
                    height: "300px",
                    borderRadius: "100%",
                    padding: "5px",
                    marginTop:"10px",
                    border: "1px solid black",
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Middle>
  );
};

export default UpdateProfiles;
