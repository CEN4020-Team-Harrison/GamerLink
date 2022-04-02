import React, { useEffect } from "react";
import axios from "axios";

// Note to frontend: in the request below you should add the gid as
// a parameter in place of the "0" and the uid in the place of the "1".
// Also add the message the user typed inside the params{message} JSON.
// The request adds a message to the database. This should be connected
// when the user clicks a send message button.
const addMessageCallback = () => {
  axios.post("http://localhost:3500/add-message/0/user/1",
    {},
    { 
      headers: { "Content-Type": "application/json" },   
      params: { message: "Test message"} 
    })
    .then(res => {
      console.log("Successfully added message")
    }).catch(err => {
      console.log(err);
    })
}

const GamePage = () => {
  // Note to frontend: in the request below you should add the gid as
  // a parameter in place of the "0". The request returns a list of 
  // messages that can be used to populate the chat. 
  useEffect(() => {
    axios.get("http://localhost:3500/game-messages/0")
      .then(res => {
          console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  return (
    <div>GamePage</div>
  )
}

export default GamePage;