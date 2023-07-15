import React, { useEffect, useState } from "react";
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

     
    </>
  );
};

export default TrackComponent;
