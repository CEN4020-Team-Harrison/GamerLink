import React, { useContext } from "react";

import GoogleLogin from "react-google-login";
import axiosConfig from "../axiosConfig";
import { useHistory } from "react-router-dom";
import { userContext } from "./userContext";

const Login = () => {
  const { setUser } = useContext(userContext);
  const history = useHistory();

  const handleFailure = (result) => {
    alert(result);
  };

  const handleLogin = (googleData) => {
    axiosConfig
      .post("/auth/google-login", JSON.stringify({ token: googleData.tokenId }))
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("loginData", JSON.stringify(res.data));
        history.push("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  return (
    <div className="flex justify-center mt-40">
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
    </div>
  );
};

export default Login;
