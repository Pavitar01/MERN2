import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Middle = (props) => {
  return (
    <>
      <Header cart={props.cart} prod={props.prod} handleSearchString={props.handleSearchString} searchString={props.searchString}/>
      <main className="main">{props.children}</main>
    </>
  );
};

export default Middle;
