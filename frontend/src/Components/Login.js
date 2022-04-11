import React, { useContext, useState } from "react";

import GoogleLogin from "react-google-login";
import axiosConfig from "../axiosConfig";

// import { userContext } from "./userContext";

const Login = () => {
  // const { user, setUser } = useContext(userContext);
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );

  const handleFailure = (result) => {
    alert(result);
  };

  const handleLogin = (googleData) => {
    console.log(googleData);
    axiosConfig
      .post("/auth/google-login", JSON.stringify({ token: googleData.tokenId }))
      .then((res) => {
        setLoginData(res.data);
        // setUser(res.data);
        localStorage.setItem('loginData', JSON.stringify(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
    // setUser(null);
  };

  return (
    <div className="flex justify-center mt-60">
      {loginData ? (
        <div>
          <h3>You're logged in as {loginData.email}</h3>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
        ></GoogleLogin>
      )}
    </div>
  );
};

export default Login;
