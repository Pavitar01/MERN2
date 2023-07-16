import React, { useEffect, useState } from "react";
import Middle from "../Middle";
import AdminPannel from "./AdminPannel";
import { useAuth } from "../../Auth/Index";
import { Button, Modal, message } from "antd";
import axios from "axios";
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

const UpdateProfile = () => {
  const [auth, setAuth] = useAuth();
  const [data1, setData] = useState("");
  const navigate = useNavigate();
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
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.post(
        "http://localhost:8000/api/auth/all-user",
        {
          email: auth?.user?.email,
        }
      );
      setData(data.data);
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    name: data1.name,
    email: data1.email,
    phoneNumber: data1.phone,
    address: data1.address,
    password: "",
    userType: 0,
    ans: "",
    photo: null,
  });

  const [photo, setPhoto] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address) {
      messageApi.open({
        type: "warning",
        content: "Please fill in all fields!",
      });
    } else {
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
        <div className="row mt-5">
          <AdminPannel url={data1.photo} />
          <div className="col-8">
            <h1>Update Your Profile</h1>
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
                required
                value={formData.name}
                onChange={handleInputChange}
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={auth?.user?.email}
                readOnly
                onChange={handleInputChange}
              />

              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                minLength={9}
                maxLength={10}
                required
                value={auth?.user?.phone}
                readOnly
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

              <Modal
                title="Basic Modal"
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <input
                  type="text"
                  name="password"
                  placeholder="At least 6 characters"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </Modal>

              <input
                type="submit"
                value="Update Profile"
                style={{ marginBottom: "20px", cursor: "pointer" }}
              />
            </form>
          </div>
        </div>
      </div>
    </Middle>
  );
};

export default UpdateProfile;
