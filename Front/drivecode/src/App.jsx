import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import PageNotFound from "./Pages/PageNotFound";
import Register from "./Pages/Register";
import SignIn from "./Pages/SignIn";
import UserDashboard from "./Dashboard/User";
import PrivateRoutes from "./Routes/PrivateRoutes";
import ForgetPass from "./Pages/ForgetPass";
import AdminDashBoard from "./Dashboard/Admin";
import AdminRoutes from "./Routes/AdminRoutes";
import User from "./Components/Admin/User";
import Products from "./Components/Admin/Products";
import Vendors from "./Components/Admin/Vendors";
import Orders from "./Components/User/Orders";
import UpdateProfile1 from "./Components/Admin/UpdateProfile"
import UpdateProfile from "./Components/User/UpdateProfile"
import Category from "./Components/Admin/Category";
import EditProducts from "./Components/Admin/EditProducts";
import VendorPannel from "./Components/Vendor/VendorPannel";
import AddProducts from "./Components/Vendor/AddProduct";
import EditProduct from "./Components/Vendor/EditProduct";
import UpdateProfiles from "./Components/Vendor/UpdateProfiles";
import Home1 from "./Components/categories/Home";
import Mens from "./Components/categories/Mens";
import Allcategories from "./Components/categories/Allcategories";
import Women from "./Components/categories/Women";
import Children from "./Components/categories/Children";
import BestSeller from "./Components/categories/BestSeller";
import Beauty from "./Components/categories/Beauty";
import Draft from "./Components/Vendor/Draft";
import Cart from "./Pages/Cart";
import AllOrders from "./Components/Admin/Order";
import AllOrder from "./Components/Vendor/Orders";
import Policy from "./Pages/Policy";
import TrackComponent from "./Pages/TrackComponent";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home/trending" element={<Home1 />} />
        <Route path="/best-seller" element={<BestSeller />} />
        <Route path="/home/men" element={<Mens />} />
        <Route path="/home/women" element={<Women />} />
        <Route path="/home/beauty" element={<Beauty />} />
        <Route path="/home/children" element={<Children />} />
        <Route path="/home/all-category" element={<Allcategories />} />
        
        <Route path="/user-dashboard" element={<PrivateRoutes />}>
          <Route path="" element={<UserDashboard />} />
        </Route>
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/user/profile" element={<UpdateProfile />} />
          <Route path="/user/orders" element={<Orders />} />
        <Route path="/user/track-order" element={<TrackComponent />} />

        </Route>


        <Route path="/vendor-dashboard" element={<PrivateRoutes />} >
     
        <Route path="" element={<AddProducts />} />
        <Route path="vendor-draft" element={<Draft />} />
        <Route path="vendor-product" element={<EditProduct />} />
        <Route path="update-profile" element={<UpdateProfiles />} />
        <Route path="all-order" element={<AllOrder />} />
        </Route>

        <Route path="/admin-dashboard" element={<AdminRoutes />}>
          <Route path="" element={<AdminDashBoard />} />
        </Route>
        {/* making the routes of admin private */}
        <Route path="/" element={<AdminRoutes />}>
          <Route path="/admin/all-users" element={<User />} />
          <Route path="/admin/add-products" element={<Products />} />
          <Route path="/admin/all-vendors" element={<Vendors />} />
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/edit-product" element={<EditProducts />} />
          <Route path="/admin/update-profile" element={<UpdateProfile1 />} />
          <Route path="/admin/all-orders" element={<AllOrders />} />
        </Route>

        <Route path="/contact" element={<Contact />} />
        <Route path="/forget-pass" element={<ForgetPass />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/policy" element={<Policy />} />
   

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
