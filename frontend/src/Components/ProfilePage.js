import React, { useEffect } from "react";
import axios from "axios";

function ProfilePage() {
  // Note to frontend: in the request below you should add the uid as
  // a parameter in place of the "0". The request returns the profile
  // information related to the user with the given uid.
  useEffect(() => {
    axios.get("http://localhost:3500/user/0")
      .then((res) => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  return (
    <div>ProfilePage</div>
  )
}

export default ProfilePage;