import React, { createContext, useContext, useEffect, useState } from "react";
const Auth = createContext();

const Index = (props) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  const [hasEffectRun, setHasEffectRun] = useState(false);
  useEffect(() => {
    if (hasEffectRun) {
      return;
    }
    const data = localStorage.getItem("userAuth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    setHasEffectRun(true);
  }, [auth,hasEffectRun]);
  //auth in dependency for updation
  return (
    <Auth.Provider value={[auth, setAuth]}>{props.children}</Auth.Provider>
  );
};

const useAuth = () => useContext(Auth);
export default Index;
export { useAuth };
