import React, { useEffect, useState } from "react";
import "./Track.css"
const TrackComponent = () => {
  const [heading, setHeading] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      if (currentHour >= 0 && currentHour < 12) {
        setHeading("Good morning!");
      } else if (currentHour >= 12 && currentHour < 18) {
        setHeading("Good afternoon!");
      } else {
        setHeading("Good evening!");
      }
    };

    // Update the heading every second
    const interval = setInterval(updateTime, 1000);

    // Clear the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <h1>{heading}</h1>
      <p style={{fontSize:"20px"}}>Dear customer ,<br/> Your Order is Arriving Soon !</p>
      <div class="wrap" style={{borderBottom:"10px solid black"}}>
        <img
          class="image truck-img"
          src="https://learndesigntutorial.com/wp-content/uploads/2021/03/truck.png"
          alt=""
        />
        <img
          class="image box-img"
          src="https://learndesigntutorial.com/wp-content/uploads/2021/03/box.png"
          alt=""
        />
        <img
          class="image box-img box-img2"
          src="https://learndesigntutorial.com/wp-content/uploads/2021/03/box.png"
          alt=""
        />
      </div>
    </>
  );
};

export default TrackComponent;
