import React from "react";

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
  return (
    <div className="bg-gray-800 h-screen">
      <div className="flex flex-col mt-20 mx-20">
        <span className="text-white text-lg font-semibold pb-5">Popular Games</span>
        <div className="text-white flex justify-between">
          {Object.entries(games).map(([key, value]) => (
            <div className="" key={key}>
              <GameItem game={value} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const GameItem = ({ game }) => {
  return (
    <div>
      <img src={game.poster} className="h-80" />
      <div className="pt-3">
        <span className="">{game.title}</span>
        <p className="text-gray-500 text-sm">{game.genre}</p>
      </div>
    </div>
  );
};

export default HomePage;
