import React, { useEffect, useState } from "react";

import Loader from "./Loader";
import axios from "axios";
import axiosConfig from "../axiosConfig";
import bgimage from "../game-bg.jpeg";
import { unixTimeConvert } from "../utils";
import { useParams } from "react-router-dom";

const postGameMessageCallback = (gid, comment) => {
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

// The request returns a list of messages that can be
// used to populate the chat.
const getGameMessagesCallback = (gid, setReplies) => {
  axios
    .get(`http://localhost:3500/game-messages/${gid}`)
    .then((res) => {
      setReplies(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const ReplyItem = ({ reply }) => {
  var time = new Date(reply.timestamp);

  return (
    <div className="bg-white rounded-lg shadow-md border-solid border-2 w-8/12 p-2 mb-2 border-gray-300">
      <div className="flex items-center">
        <a href={reply.username ? `/profile/:${reply.username}` : null}>
          {reply.username ? (
            <div className="flex items-center">
              <span className="font-semibold mr-1">{reply.username}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-700"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : (
            <span className="font-semibold">Anonymous</span>
          )}
        </a>
        <span className="ml-2 text-gray-500 text-sm">{time.toLocaleString()}</span>
      </div>
      <div className="pt-1">
        <p className="">{reply.message}</p>
      </div>
    </div>
  );
};

const GamePage = () => {
  const { gid } = useParams();
  let newGid = gid.substring(1);
  const [game, setGame] = useState({});
  const [comment, setComment] = useState("");
  const [replies, setReplies] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    postGameMessageCallback(newGid, comment);
    getGameMessagesCallback(newGid, setReplies);
    setComment("");
    console.log(replies);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setComment("");
  };

  useEffect(() => {
    getGameMessagesCallback(newGid, setReplies);
    axiosConfig
      .get(`/igdb/getGameInfo/:${newGid}`)
      .then((res) => {
        setGame(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [replies]);

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
            <div className="w-8/12 mb-4 rounded-lg shadow-md shadow-purple-600/50">
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
            <div className="flex flex-col-reverse text-gray">
              {replies &&
                replies.map((reply, key) => (
                  <ReplyItem key={key} reply={reply} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
