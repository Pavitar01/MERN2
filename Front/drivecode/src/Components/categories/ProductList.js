import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Input } from "antd";
const { Meta } = Card;
const { Search } = Input;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Search
        placeholder="Search products"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: 300, margin: "20px" }}
      />

      <div
        style={{
          width: "100%",
          height: "600px",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "space-around",
          overflow: "scroll",
          padding: "20px",
        }}
        className="scrollBar"
      >
        {filteredProducts.map((product) => (
          <Card
            hoverable
            bordered="true"
            style={{
              width: 300,
              height: 500,
              boxShadow: "1px 1px 100px 1px lightgray",
            }}
            cover={<img alt="example" src={product.image} width={300} height={300} />}
          >
            <Meta title={product.title} />
            <Meta title={product.category} style={{ color: "gray" }} />
            <p style={{textAlign:"left"}}>
              Price: &#8377;{product.price}{" "}
              <del style={{ color: "gray" }}>{product.price * 1.5}</del>
            </p>
            <p style={{textAlign:"left"}}>Rating: {product.rating.rate}</p>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ProductList;
