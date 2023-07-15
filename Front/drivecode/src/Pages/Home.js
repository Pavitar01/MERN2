import React, { useEffect, useState } from "react";
import { useAuth } from "../Auth/Index";
import Home1 from "../Components/categories/Home";
import Allcategories from "../Components/categories/Allcategories";
const Home = () => {
  const [auth, setAuth] = useAuth();

  return (
    <>
     <Allcategories/>
    </>
  );
};

export default Home;
