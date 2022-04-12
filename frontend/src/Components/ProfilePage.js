import Loader from "./Loader";
import React from "react";
import avatar from "../avatar-placeholder.png";
import { useContext } from "react";
import { userContext } from "./userContext";

// Note to frontend: in the request below you should add the uid as
// a parameter in place of the "0". The request returns the profile
// information related to the user with the given uid.
const getUserCallback = () => {
	axios.get("http://localhost:3500/user/0")
	.then(res => {
	  console.log(res.data);
	})
	.catch(err => {
	  console.log(err);
	})
  }
  
  // Note to frontend: in this request below you should add the uid as
  // a parameter in place of the "0". The request returns the list of games
  // that the user has rated. This should be added below the profile to show
  // a view of the games the user rated.
  const getRatedGamesCallback = () => {
	axios.get("http://localhost:3500/rated-games/0")
	.then(res => {
	  console.log(res.data);
	})
	.catch(err => {
	  console.log(err);
	})
  }
  
  // Note to frontend: in the request below you should add the uid as
  // a parameter in place of the "0". The request adds or updates information
  // related to the user profile.
  const addUserCallback = () => {
	axios.post("http://localhost:3500/add-user/0",
	  {},
	  { 
		headers: { "Content-Type": "application/json" },
		params: { 
		  username: "Test Username",
		  discord: "Test Discord Link",
		  steam: "Test Steam Link",
		  facebook: "Test Facebook Link",
		  description: "Test Description Link"
		 } 
	  })
	  .then(res => {
		console.log("Successfully added user.")
	  }).catch(err => {
		console.log(err);
	  })
  }
  
  const links = {
  link1: {
    linkName: "Twitter",
    linkUrl: "Twitter.com",
  },
  link2: {
    linkName: "Discord",
    linkUrl: "Discord.com",
  },
  link3: {
    linkName: "Youtube",
    linkUrl: "Youtube.com",
  },
};

const replies = {
  reply1: {
    message: "A new Twist to a old franchise",
  },
  reply2: {
    message: "Same game, horrible and laggy at times",
  },
  reply3: {
    message: "Fortnite is so musch better and cheaper",
  },
};

const ReplyItem = ({ reply }) => {
  return (
    <div>
      <span className="">{reply.userName}</span>
      <div className="pt-3">
        <p className="text-gray-500 text-sm">{reply.message}</p>
      </div>
    </div>
  );
};

const LinksItem = ({ link }) => {
  return (
    <div>
      <span className="">{link.linkName}</span>
      <div className="pt-3">
        <p className="text-gray-500 text-sm">{link.linkUrl}</p>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  const { user } = useContext(userContext);

  return user ? (
    <div className="flex justify-center mt-20">
      <div className="flex flex-col">
        <div className="flex">
          <div className="flex flex-col mr-20">
            <span className="font-bold flex text-lg justify-center">
              {user.name && user.name}
            </span>
            <div className="flex justify-start h-40 px-5">
              <img src={avatar} className="h-40 mt-5" />
            </div>
          </div>

          <div className="text-gray flex flex-col"></div>
          <div>
            <span className="font-semibold text-lg">Links</span>
            {Object.entries(links).map(([key, value]) => (
              <div className="flex justify-start" key={key}>
                <LinksItem link={value} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-20">
          <span className="text-black text-lg font-semibold">Comments</span>
          <div className="text-gray flex flex-col ">
            {Object.entries(replies).map(([key, value]) => (
              <div className="flex justify-right" key={key}>
                <ReplyItem reply={value} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}
