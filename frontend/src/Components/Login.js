import GoogleLogin from 'react-google-login';
import React from 'react';

const Login = () => {
  const handleFailure = (result) => {
    alert(result);
  }
  
  const handleLogin = (googleData) => {
    console.log(googleData);
  }
  
  return (
    <div className='flex justify-center mt-60'>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={handleLogin}
        onFailure={handleFailure}
        cookiePolicy={'single_host_origin'}
      ></GoogleLogin>
    </div>
  )
}

export default Login