import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Auth/Index";
import toast from "react-hot-toast";

const ForgetPass = () => {
  //navigate
  const navigate = useNavigate();
  //error and success states
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    ans:""
  });

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
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/forget-password",
        {
          email: formData.emailOrPhone,
          pass: formData.password,
          ans:formData.ans,
        }
      );

      if (response.data.success) {
     
        setFormData({
          emailOrPhone: "",
          password: "",
          ans:""
        });
        setSuccess(response.data.message);


        //navigate to home if successfully login
    navigate("/signin");

      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="register">
      <div className="login-box">
        <h1 style={{ fontSize: "30px", textAlign: "left", marginLeft: "16px" }}>
          Reset Password
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
          <label>Your Security Answer</label>
          <input
            type="text"
            name="ans"
            placeholder="Your favorite car?"
            value={formData.ans}
            onChange={(e) => {
              setError("");
              handleInputChange(e);
            }}
          />
          <label>New Password</label>
          <input
            type="password"
            name="password"
            placeholder="New password"
            value={formData.password}
            onChange={(e) => {
              setError("");
              handleInputChange(e);
            }}
          />

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
    </div>
  );
};

export default ForgetPass;
