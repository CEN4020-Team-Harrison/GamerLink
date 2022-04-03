import React, { useEffect } from "react";
import axios from "axios";

// Note to frontend: in the request below you should add the uid as
// a parameter in place of the "0". The request returns the profile
// information related to the user with the given uid.
const getUserCallback = () => {
  axios.get("http://localhost:3500/user/0")
  .then(res => {
    console.log(res.data);
  })
  .catch(err => {
    console.log(err);
  })
}

// Note to frontend: in this request below you should add the uid as
// a parameter in place of the "0". The request returns the list of games
// that the user has rated. This should be added below the profile to show
// a view of the games the user rated.
const getRatedGamesCallback = () => {
  axios.get("http://localhost:3500/rated-games/0")
  .then(res => {
    console.log(res.data);
  })
  .catch(err => {
    console.log(err);
  })
}

// Note to frontend: in the request below you should add the uid as
// a parameter in place of the "0". The request adds or updates information
// related to the user profile.
const addUserCallback = () => {
  axios.post("http://localhost:3500/add-user/0",
    {},
    { 
      headers: { "Content-Type": "application/json" },
      params: { 
        username: "Test Username",
        discord: "Test Discord Link",
        steam: "Test Steam Link",
        facebook: "Test Facebook Link",
        description: "Test Description Link"
       } 
    })
    .then(res => {
      console.log("Successfully added user.")
    }).catch(err => {
      console.log(err);
    })
}

function ProfilePage() {
  useEffect(() => {
    getUserCallback()
    getRatedGamesCallback()
  }, []);

  return (
    <div>ProfilePage</div>
  )
}

export default ProfilePage;