import Carousel from "react-elastic-carousel";
import React from "react";
import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";

import axios from "axios";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 700, itemsToShow: 3 },
  { width: 900, itemsToShow: 4 },
  { width: 1200, itemsToShow: 4 },
];

const games = {
  game1: {
    id: 1,
    poster: "https://images.igdb.com/igdb/image/upload/t_cover_big/co3d03.png",
    title: "Pokémon Legends: Arceus",
    genre: "Adventure",
  },
  game2: {
    id: 2,
    poster: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.png",
    title: "Elden Ring",
    genre: "Role-playing (RPG)",
  },
  game3: {
    id: 3,
    poster: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4d2x.png",
    title: "Yu-Gi-Oh! Master Duel",
    genre: "Card & Board Game",
  },
  game4: {
    id: 4,
    poster: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4h5s.png",
    title: "Sifu",
    genre: "Fighting",
  },
  game5: {
    id: 5,
    poster: "https://images.igdb.com/igdb/image/upload/t_cover_big/co31k4.png",
    title: "Dying Light 2: Stay Human",
    genre: "Adventure",
  },
};

function HomePage() {
  const history = useHistory();
  // fake json placeholder api not the real IGDB api
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  return (
    <div className="bg-gray-200 h-screen">
      <div className="flex flex-col mt-20 mx-20">
        <span className="text-white text-lg font-semibold pb-5 ml-20">
          Popular Games
        </span>
        <Carousel
          breakPoints={breakPoints}
          className="text-white flex justify-between"
        >
          {Object.entries(games).map(([key, value]) => (
            <div className="" key={key} onClick={() => {history.push("/game:gameId")}}>
              <GameItem game={value} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

const GameItem = ({ game }) => {
  return (
    <div>
      <img src={game.poster} className="h-70" />
      <div className="pt-3">
        <span className="">{game.title}</span>
        <p className="text-gray-500 text-sm">{game.genre}</p>
      </div>
    </div>
  );
};

export default HomePage;
