import React, { useContext, useEffect, useState } from "react";

import Loader from "./Loader";
import axios from "axios";
import axiosConfig from "../axiosConfig";
import bgimage from "../game-bg.jpeg";
import { unixTimeConvert } from "../utils";
import { useParams } from "react-router-dom";
import { userContext } from "./userContext";

const ReplyItem = ({ reply }) => {
  return (
    <div>
      <a href={`/profile/:${reply.uid}`}>
        <span className="">{reply.uid}</span>
      </a>
      <div className="pt-1">
        <p className="text-gray-500 text-sm">{reply.message}</p>
      </div>
    </div>
  );
};

const GamePage = () => {
  const { gid } = useParams();
  let newGid = gid.substring(1);
  const { user } = useContext(userContext);
  const [game, setGame] = useState({});
  const [comment, setComment] = useState("");
  const [replies, setReplies] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
    .post(
      `http://localhost:3500/add-message/${gid}`,
      {},
      {
        headers: { "Content-Type": "application/json" },
         params: { message: comment },
       }
     )
     .then((res) => {
       console.log("Successfully added message.");
     })
     .catch((err) => {
       console.log(err);
     });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setComment("");
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3500/game-messages/${gid}`)
      .then((res) => {
        setReplies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axiosConfig
      .get(`/igdb/getGameInfo/:${newGid}`)
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
              {replies && replies.map((reply, key) => <ReplyItem key={key} reply={reply} />)}
            </div>
            <div className="max-w-lg rounded-lg shadow-md shadow-purple-600/50">
              <form
                onSubmit={handleSubmit}
                onReset={handleCancel}
                className="w-full p-4"
              >
                <div className="mb-2">
                  <label htmlFor="comment" className="text-base text-gray-600">
                    Add a comment
                  </label>
                  <textarea
                    className="w-full h-20 p-2 mt-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                    name="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Type something..."
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="px-3 py-2 mr-2 text-sm text-purple-100 bg-purple-600 rounded"
                  >
                    Comment
                  </button>
                  <button
                    type="reset"
                    className="px-3 py-2 text-sm text-purple-600 border border-purple-500 rounded"
                  >
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
