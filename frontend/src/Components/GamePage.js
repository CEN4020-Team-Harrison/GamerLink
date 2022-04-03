import React, { useEffect, useState } from "react";

import axiosConfig from "../config/axiosConfig";
import bgimage from "../game-bg.jpeg";
import { useParams } from "react-router-dom";

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
