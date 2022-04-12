import React, { useContext, useState } from "react";

import GoogleLogin from "react-google-login";
import axiosConfig from "../axiosConfig";
import { userContext } from "./userContext";

const Login = () => {
  const { user, setUser } = useContext(userContext);

  const handleFailure = (result) => {
    alert(result);
  };

  const handleLogin = (googleData) => {
    axiosConfig
      .post("/auth/google-login", JSON.stringify({ token: googleData.tokenId }))
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("loginData", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  return (
    <div className="flex justify-center mt-40">
      {user ? (
        <div>
          <h3>You're logged in as {user.email}</h3>
        </div>
      ) : (
        <div className="grid justify-items-stretch">
          <span className="text-lg font-semibold">Welcome to GamerLink!</span>
          <div className="justify-self-center mt-10">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login with Google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={"single_host_origin"}
            ></GoogleLogin>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
