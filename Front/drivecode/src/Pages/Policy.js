import React from "react";
import "./policy.css";
import { useNavigate } from "react-router-dom";
const Policy = () => {
  const navigate = useNavigate();
  return (
    <div className="policy-page">
      <h1>Privacy Policy</h1>

      <h2>Introduction</h2>
      <p>
        Welcome to Shopo, your ultimate destination for fashion and style! At
        Shopo, we value your privacy and are committed to protecting your
        personal information. This privacy policy explains how we collect, use,
        and safeguard your data when you use our website and services.
      </p>

      <h2>Information Collection</h2>
      <p>
        We collect information from you when you interact with our website and
        services. The types of information we collect may include:
      </p>
      <ul>
        <li>
          Personal identification details such as your name, email address, and
          contact information
        </li>
        <li>Demographic information such as your age, gender, and location</li>
        <li>Payment details for processing transactions</li>
        <li>
          Browsing behavior, preferences, and interactions with our website
        </li>
        <li>Communications and correspondence with us</li>
      </ul>

      <h2>Information Usage</h2>
      <p>
        We use the information we collect to provide and improve our services,
        enhance your shopping experience, and personalize the content and
        recommendations we offer. Here's how we may use your data:
      </p>
      <ul>
        <li>Process and fulfill your orders</li>
        <li>
          Communicate with you about your purchases and provide customer support
        </li>
        <li>Analyze and improve our website, products, and services</li>
        <li>
          Personalize your shopping experience based on your preferences and
          browsing history
        </li>
        <li>
          Send you marketing communications, exclusive offers, and updates (with
          your consent)
        </li>
      </ul>

      <h2>User Profile</h2>
      <p>
        To provide you with a personalized shopping experience, we may request
        certain information to create your user profile. This may include your
        full name, email address, shipping address, and preferences. Rest
        assured that we handle your profile information with the utmost care and
        do not share it with third parties without your consent.
      </p>

      <h2>Product Information</h2>
      <p>
        In order to fulfill your orders and improve our product offerings, we
        collect information related to your purchases. This may include details
        such as product names, sizes, colors, and order history. We use this
        information to process your orders efficiently and tailor our
        recommendations to your preferences.
      </p>

      <h2>Disclosure of Information</h2>
      <p>
        At Shopo, we prioritize your privacy and do not sell or disclose your
        personal information to third parties for marketing purposes. However,
        we may share your data with trusted service providers and business
        partners who assist us in delivering our services and enhancing your
        shopping experience.
      </p>

      <button className="policy-page-button" onClick={()=>navigate("/")}>Accept Policy</button>
    </div>
  );
};

export default Policy;
