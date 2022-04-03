import React, { useEffect, useState } from "react";

import axios from "axios";
import bgimage from "../game-bg.jpeg";
import { useParams } from "react-router-dom";

// Note to frontend: in the request below you should add the gid as
// a parameter in place of the "0". The request returns a list of 
// messages that can be used to populate the chat. 
const getMessagesCallback = () => {
  axios.get("http://localhost:3500/game-messages/0")
      .then(res => {
          console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
}

// Note to frontend: in the request below you should add the gid as
// a parameter in place of the "0". The request returns the average
// rating for the game given by all users. This should be displayed
// in the 5-star display for the game page.
const getGameRatingCallback = () => {
  axios.get("http://localhost:3500/avg-game-rating/0")
      .then(res => {
          console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
}

// Note to frontend: in the request below you should add the gid as
// a parameter in place of the "0" and the uid in place of the "1". 
// The request returns the rating for the game given by the user. This
// rating value should be displayed before the user edits its rating.
// An empty list will be returned if the user has not rated the game.
const getGameRatingByUserCallback = () => {
  axios.get("http://localhost:3500/game-rating/0/user/1")
      .then(res => {
          console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
}

// Note to frontend: in the request below you should add the gid as
// a parameter in place of the "0", the uid in place of the "1", and the 
// rating in place of the "2". The request adds a rating to a game given
// by a given user. This should be connected when the user clicks the rating
// button (5-stars) 
const addGameRatingCallback = () => {
  axios.post("http://localhost:3500/rate-game/0/user/1/rating/2",
    {},
    { 
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      console.log("Successfully added rating.")
    }).catch(err => {
      console.log(err);
    })
}

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
      params: { message: "Test message" } 
    })
    .then(res => {
      console.log("Successfully added message.")
    }).catch(err => {
      console.log(err);
    })
}


const GamePage = () => {
  const { gid } = useParams();
  const [game, setGame] = useState({});
  
  useEffect(() => {
    // axiosConfig({
    //   method: "post",
    //   url: "/games",
    //   data: `fields *; where id = ${gid};`,
    // })
    //   .then((response) => {
    //     console.log(response.data);
    //     setGame(response.data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }, []);

  const mockGame = {
    title: "Sifu",
    poster: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4h5s.png",
    date: "Feb 08, 2022 (2 months ago)",
    genre: "Fighting, Hack and slash, Indie",
    platform: "PlayStation 4, PlayStation 5, PC (Microsoft Windows)",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at dapibus ligula.",
    version: "4.12.6",
  };


  // useEffect(() => {
  //   addMessageCallback()
  //   getMessagesCallback()
  // }, []);

  return (
    <div className="bg-gray-200">
      <img src={bgimage} className="w-full" />
      <div className="flex -mt-60 pb-40">
        <div className="flex flex-col ml-40 space-y-5 w-80">
          <img src={mockGame.poster} className="w-80" />
          <button className="-mt-10 w-80 h-10 font-medium bg-purple-600 hover:bg-purple-500 text-white rounded">
            Follow
          </button>
        </div>
        <div className="ml-5">
          <div className="grid gap-1 mt-20 font-bold">
            <span className="text-[60px] text-white">{mockGame.title}</span>
            <span className="text-xl text-gray-300">{mockGame.date}</span>
          </div>
          <div className="grid mt-10 ml-5 w-4/5">
            <div className="border-b-4 w-20 border-purple-600 p-2">
              <span className="font-semibold text-gray-700">About</span>
            </div>
            <div className="mt-4 flex flex-col space-y-2 text-sm">
              <div>
                <span className="font-semibold">Genre: </span>
                <span>{mockGame.genre}</span>
              </div>
              <div>
                <span className="font-semibold">Platform: </span>
                <span>{mockGame.platform}</span>
              </div>
              <div>
                <span className="font-semibold">Version: </span>
                <span>{mockGame.version}</span>
              </div>
              <span>{mockGame.about}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
