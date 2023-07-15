import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Auth/Index";
import { Button, Modal, Radio,message } from "antd";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase/config";

const SignIn = () => {
  const auth1 = getAuth(app);
  const [auth, setAuth] = useAuth();
  //usenavigate to navigate the pages
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();


  //setting useStates for all details of user
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  //error and success states
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //input handle changes to set value for the states
  //using name and set correspoding value
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //for submitting the form handleSubmit is help
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.emailOrPhone || !formData.password) {
      messageApi.open({
        type: 'error',
        content: "Both feilds required !"
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email: formData.emailOrPhone,
          pass: formData.password,
        }
      );
      if (response.data.success) {
        messageApi.open({
          type: 'success',
          content: " Logging In!"
        });
        setFormData({
          emailOrPhone: "",
          password: "",
        });
  
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        // using local storage
        localStorage.setItem("userAuth", JSON.stringify(response.data));
        //navigate to home if successfully login
        if (response.data.user.role === 2) {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      } else {
        messageApi.open({
          type: 'error',
          content: (response.data.message)
        });
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: "Login error. Please try again later."
      });
    }
  };
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth1, provider);
      const response = await axios.post(
        "http://localhost:8000/api/auth/google-login",
        {
          email: result.user.email,
        }
      );
  
      if (response.data) {
        messageApi.open({
          type: 'success',
          content: "Account is created !"
        });
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        // using local storage
        localStorage.setItem("userAuth", JSON.stringify(response.data));
        // navigate to home if successfully login
        if (response.data.user.role === 2) {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      } else {
        messageApi.open({
          type: 'error',
          content: response.data.message
        });
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: "Login error. Please try again later."
      });
    }
  };
  

  return (
    <div className="register">
    {contextHolder}

      <div className="login-box">
        <h1 style={{ fontSize: "30px", textAlign: "left", marginLeft: "16px" }}>
          Sign In
        </h1>
        <form onSubmit={handleSubmit}>
          <label>Email or Phone Number</label>
          <input
            type="text"
            name="emailOrPhone"
            placeholder="Email or phone number"
            value={formData.emailOrPhone}
            onChange={(e) => {
              setError("");
              handleInputChange(e);
            }}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => {
              setError("");
              handleInputChange(e);
            }}
          />
          <span
            style={{ fontSize: "15px", color: "purple", cursor: "pointer" }}
            onClick={() => navigate("/forget-pass")}
          >
            Forget Password{" "}
          </span>
          <p style={{ height: "50px" }}>
            By continuing, you agree to ShopCart's{" "}
            <Link to={"/policy"} style={{ color: "purple" }}>
              Terms and conditions
            </Link>
          </p>
          <input
            type="submit"
            value="Submit"
            style={{ marginBottom: "20px" }}
          />
        </form>
        {error ? (
          <h6 style={{ color: "red", fontWeight: "400", paddingLeft: "20px" }}>
            {error}
          </h6>
        ) : (
          ""
        )}
        {success && (
          <h6
            style={{ color: "green", fontWeight: "400", paddingLeft: "20px" }}
          >
            {success}
          </h6>
        )}
      </div>
      <p
        style={{
          color: "gray",
          fontSize: "13px",
          fontWeight: 600,
          marginTop: "-60px",
        }}
      >
        New to ShopCart?
      </p>
      <div className="login-box" style={{ marginTop: "-10px" }}>
        <p
          style={{
            height: "10px",
            fontSize: "13px",
            fontWeight: 600,
            boxSizing: "border-box",
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            padding: "10px",
            marginTop: "-5px",
          }}
        >
          <Link to="/register">Create your ShopCart Account</Link>
        </p>
      </div>
      <p
        style={{
          color: "gray",
          fontSize: "13px",
          fontWeight: 600,
          marginTop: "-60px",
        }}
      >
        or
      </p>
      <div
        className="login-box"
        style={{ marginTop: "-10px", backgroundColor: "blue" }}
      >
        <p
          style={{
            height: "50px",
            fontSize: "13px",
            fontWeight: 600,
            boxSizing: "border-box",
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            padding: "10px",
            marginTop: "-5px",
          }}
        >
          <img
            src="https://th.bing.com/th/id/OIP.qUnygM-B3aiUueZLqttGvAHaBg?pid=ImgDet&rs=1"
            style={{ width: "100%", height: "50px", cursor: "pointer" }}
            onClick={handleSignIn}
          />
        </p>
      </div>
    </div>
  );
};

export default SignIn;
