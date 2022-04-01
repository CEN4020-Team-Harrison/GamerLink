import React, { useEffect } from "react";
import axios from "axios";

const GamePage = () => {
  // Note to frontend: in the request below you should add the gid as
  // a parameter in place of the "0". The request returns a list of 
  // messages that can be used to populate the chat. 
  useEffect(() => {
    axios.get("http://localhost:3500/game-messages/0")
    .then((res) => {
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