import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Button, Modal, Radio, message } from "antd";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase/config";

const Register = () => {
  const auth1 = getAuth(app);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();

  const onChange = (e) => {
    // console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth1, provider);
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          email: result.user.email,
          flag: 1,
          name: result.user.displayName,
          address: "",
          role: value,
          pass: "123456",
          ans: "123456",
          phone: "123456",
        }
      );

      if (response.data.success) {
        messageApi.open({
          type: "success",
          content: "Account is created ",
        });
        navigate("/signin");
        // Reset form fields
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          address: "",
          password: "",
          userType: 0,
          ans: "",
        });
      } else {
        messageApi.open({
          type: "error",
          content: response.data.message,
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Error during registration:",
        error,
      });
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //navigate for user

  const navigate = useNavigate();
  //usestate for registering user
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    userType: 0,
    ans: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: parseInt(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form fields
    if (
      !formData.name ||
      !formData.phoneNumber ||
      !formData.password ||
      !formData.ans
    ) {
      messageApi.open({
        type: "error",
        content: "Error during registration:",
        error,
      });

      return;
    } else if (formData.phoneNumber.length != 10) {
      messageApi.open({
        type: "error",
        content: "Phone number should be of 10 digit",
      });
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          pass: formData.password,
          phone: formData.phoneNumber,
          role: formData.userType,
          address: formData.address,
          ans: formData.ans,
          flag: 1,
        }
      );
      if (response.data.success) {
        messageApi.open({
          type: "success",
          content: "Account is created !",
        });
        navigate("/signin");
        // Reset form fields
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          address: "",
          password: "",
          userType: 0,
          ans: "",
        });
        messageApi.open({
          type: "error",
          content: response.data.message,
        });
      } else {
        messageApi.open({
          type: "error",
          content: response.data.message,
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Some Error Occured!",
      });
    }
  };

  return (
    <div className="register">
      {contextHolder}
      <div className="signup-box">
        <h1 style={{ fontSize: "30px", textAlign: "left", marginLeft: "16px" }}>
          Create Account
        </h1>
        <form onSubmit={handleSubmit}>
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
            required
            value={formData.email}
            onChange={handleInputChange}
          />

          <label>Phone Number</label>

          <input
            type="number"
            maxLength={10}
            name="phoneNumber"
            placeholder="Please fill 10 digit number"
            required
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />

          <label>Address (or do it later)</label>
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

          <label>Create Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
          <label>Security Answer ?</label>
          <input
            type="text"
            name="ans"
            placeholder="Your favorite car ?"
            required
            value={formData.ans}
            onChange={handleInputChange}
          />

          <div className="radio">
            <input
              type="radio"
              value={0}
              name="userType"
              checked={formData.userType === 0}
              onChange={handleRadioChange}
            />
            <label>Customer</label>

            <input
              type="radio"
              value={1}
              name="userType"
              checked={formData.userType === 1}
              onChange={handleRadioChange}
            />
            <label>Vendor</label>
          </div>

          <p style={{ color: "red" }}>{error}</p>

          <p style={{ color: "purple" }}>
            Already have an account?{" "}
            <span>
              <Link to="/signin">Login</Link>
            </span>
          </p>

          <input
            type="submit"
            value="Submit"
            style={{ marginBottom: "20px", height: "50px", padding: "10px" }}
          />
        </form>
        <p style={{ width: "100%", textAlign: "center" }}>
          <Button type="primary" onClick={showModal}>
            SignUp Wth Google
          </Button>
          <Modal
            title="Google SignUp"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={0}>Customer</Radio>
              <Radio value={1}>Vendor</Radio>
            </Radio.Group>
          </Modal>
        </p>
      </div>
    </div>
  );
};

export default Register;
