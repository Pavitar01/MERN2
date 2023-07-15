import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
  const [timer, setTimer] = useState(5);
  //navigate
  const navigate = useNavigate();

  //spinner useffect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((val) => --val);
    }, 1000);
    timer === 0 && navigate("/");
    return () => clearInterval(interval);
  }, [timer]);
  return (
    <div>
      <div
        class="d-flex justify-content-center align-items-center mt-50"
        style={{ height: "80vh", flexDirection: "column" }}
      >
        <span> Redirecting You to Home Page in {timer} sec</span>
        <br />
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
