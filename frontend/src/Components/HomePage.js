import React, { useEffect, useState } from "react";

import Carousel from "react-elastic-carousel";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
};

function HomePage() {
  const history = useHistory();
  // const [games, setGames] = useState({});

  useEffect(() => {
    axios.get()
  }, []);

  return (
    <div className="bg-gray-200 h-screen">
      <div className="flex flex-col mt-20 mx-20">
        <span className="text-gray-800 text-lg font-semibold pb-5 ml-20">
          Popular Games
        </span>
        <Carousel
          breakPoints={breakPoints}
          className="text-gray-800 flex justify-between"
        >
          {Object.entries(games).map(([key, game]) => (
            <div
              key={key}
              onClick={() => {
                history.push(`/game/:${game.id}`);
              }}
            >
              <GameItem game={game} />
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
        <span>{game.name}</span>
        <p className="text-gray-500 text-sm">{game.genres}</p>
      </div>
    </div>
  );
};

export default HomePage;
