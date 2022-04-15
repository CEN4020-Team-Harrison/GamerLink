import React, { useContext, useEffect, useState } from "react";

import Loader from "./Loader";
import axios from "axios";
import axiosConfig from "../axiosConfig";
import bgimage from "../game-bg.jpeg";
import { unixTimeConvert } from "../utils";
import { useParams } from "react-router-dom";
import { userContext } from "./userContext";

// Note to frontend: in the request below you should add the gid as
// a parameter in place of the "0". The request returns a list of
// messages that can be used to populate the chat.
const getMessagesCallback = () => {
  axios
    .get("http://localhost:3500/game-messages/0")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Note to frontend: in the request below you should add the gid as
// a parameter in place of the "0". The request returns the average
// rating for the game given by all users. This should be displayed
// in the 5-star display for the game page.
const getGameRatingCallback = () => {
  axios
    .get("http://localhost:3500/avg-game-rating/0")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Note to frontend: in the request below you should add the gid as
// a parameter in place of the "0" and the uid in place of the "1".
// The request returns the rating for the game given by the user. This
// rating value should be displayed before the user edits its rating.
// An empty list will be returned if the user has not rated the game.
const getGameRatingByUserCallback = () => {
  axios
    .get("http://localhost:3500/game-rating/0/user/1")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Note to frontend: in the request below you should add the gid as
// a parameter in place of the "0", the uid in place of the "1", and the
// rating in place of the "2". The request adds a rating to a game given
// by a given user. This should be connected when the user clicks the rating
// button (5-stars)
const addGameRatingCallback = () => {
  axios
    .post(
      "http://localhost:3500/rate-game/0/user/1/rating/2",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((res) => {
      console.log("Successfully added rating.");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Note to frontend: in the request below you should add the gid as
// a parameter in place of the "0" and the uid in the place of the "1".
// Also add the message the user typed inside the params{message} JSON.
// The request adds a message to the database. This should be connected
// when the user clicks a send message button.
const addMessageCallback = () => {
  axios
    .post(
      "http://localhost:3500/add-message/0/user/1",
      {},
      {
        headers: { "Content-Type": "application/json" },
        params: { message: "Test message" },
      }
    )
    .then((res) => {
      console.log("Successfully added message.");
    })
    .catch((err) => {
      console.log(err);
    });
};

const replies = {
  reply1: {
    userName: "Tom",
    message: "A new Twist to a old franchise",
  },
  reply2: {
    userName: "Frank",
    message: "Same game, horrible and laggy at times",
  },
  reply3: {
    userName: "Fboy32",
    message: "Fortnite is so musch better and cheaper",
  },
};

const ReplyItem = ({ user, message, reply }) => {
  return (
    <div>
      <a href={`/profile/:${reply.userName}`}>
        <span className="">{reply.userName}</span>
      </a>
      <div className="pt-1">
        <p className="text-gray-500 text-sm">{reply.message}</p>
      </div>
    </div>
  );
};

const GamePage = () => {
  const { gid } = useParams();
  const { user } = useContext(userContext);
  const [game, setGame] = useState({});
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // post reply to api
    console.log(comment);
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setComment('');
  }

  useEffect(() => {
    axiosConfig
      .get(`/igdb/getGameInfo/:${gid}`)
      .then((res) => {
        setGame(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const poster = `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover}.png`;
  const releaseDate = unixTimeConvert(game.first_release_date);
  return (
    <div className="bg-gray-200 h-max">
      <img src={bgimage} className="w-full" />
      <div className="flex -mt-60 pb-40">
        <div className="flex flex-col ml-40 space-y-5 w-80">
          <img src={poster} className="w-80" />
          <button
            onClick={() => alert("Coming soon!")}
            className="-mt-10 w-80 h-10 font-medium bg-purple-600 hover:bg-purple-500 text-white rounded"
          >
            Follow
          </button>
        </div>
        <div className="ml-5">
          <div className="grid gap-1 mt-20 font-bold">
            <div className="flex">
              <span className="text-[60px] text-white mr-5">
                {game.name ? game.name : "Loading Game"}
              </span>
              {!game.name && <Loader />}
            </div>
            <span className="text-xl text-gray-300">
              {game.first_release_date ? releaseDate : "Loading Date"}
            </span>
          </div>
          <div className="grid mt-10 ml-5 w-4/5">
            <div className="border-b-4 w-20 border-purple-600 p-2">
              <span className="font-semibold text-gray-700">About</span>
            </div>
            <div className="mt-4 flex flex-col space-y-2 text-sm">
              <div>
                <span className="font-semibold">Genre: </span>
                <span>{game.genres}</span>
              </div>
              <div>
                <span className="font-semibold">Platform: </span>
                <span>{game.platforms}</span>
              </div>
              <div>
                <span className="font-semibold">Version: </span>
                <span>{game.version_title}</span>
              </div>
              <span>{game.summary}</span>
            </div>
          </div>
          <div className="flex flex-col mt-12 ml-5">
            <div className="border-b-4 w-24 border-purple-600 pb-2 mb-5">
              <span className="font-semibold text-gray-700">Comments</span>
            </div>
            
            {/* render a list of comment from api  */}
            <div className="text-gray grid grid-cols-1 justify-items-start">
              {Object.entries(replies).map(([key, value]) => (
                <div className="mb-5" key={key}>
                  <ReplyItem user={user} message={comment} reply={value} />
                </div>
              ))}
            </div>
            <div className="max-w-lg rounded-lg shadow-md shadow-purple-600/50">
              <form onSubmit={handleSubmit} onReset={handleCancel} className="w-full p-4">
                <div className="mb-2">
                  <label htmlFor="comment" className="text-base text-gray-600">
                    Add a comment
                  </label>
                  <textarea
                    className="w-full h-20 p-2 mt-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                    name="comment"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Type something..."
                  ></textarea>
                </div>
                <div>
                  <button type="submit" className="px-3 py-2 mr-2 text-sm text-purple-100 bg-purple-600 rounded">
                    Comment
                  </button>
                  <button type="reset" className="px-3 py-2 text-sm text-purple-600 border border-purple-500 rounded">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
