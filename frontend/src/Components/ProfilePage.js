import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useEffect, useState } from "react";

import { SocialIcon } from "react-social-icons";
import avatar from "../avatar-placeholder.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import { userContext } from "./userContext";

const getUserCallback = (setUserToRender) => {
  axios
    .get("http://localhost:3500/user")
    .then((res) => {
      setUserToRender(res.data[0]);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Note to dan: this one is used to visit another user's profile
// (no edit button should be shown).
const getOtherUserCallback = (uid, setUserToRender) => {
  axios
    .get(`http://localhost:3500/other-user/${uid}`)
    .then((res) => {
      setUserToRender(res.data[0]);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Note to dan: this one returns the five most recent comments
const getRecentCommentsCallback = (uid, setComments) => {
  axios
    .get(`http://localhost:3500/user-comments/${uid}`)
    .then((res) => {
      setComments(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Note to frontend: in the request below you should add the uid as
// a parameter in place of the "0". The request adds or updates information
// related to the user profile.
const addUserCallback = () => {
  axios
    .post(
      "http://localhost:3500/add-user",
      {},
      {
        headers: { "Content-Type": "application/json" },
        params: {
          discord: "Test Discord Link",
          steam: "Test Steam Link",
          facebook: "Test Facebook Link",
          description: "Test Description Link",
        },
      }
    )
    .then((res) => {
      console.log("Successfully added user.");
    })
    .catch((err) => {
      console.log(err);
    });
};

const socialLinks = {
  twitch: {
    title: "Steam",
    url: "https://www.steam.com/",
  },
  discord: {
    title: "Discord",
    url: "https://www.discord.com/",
  },
  facebook: {
    title: "Facebook",
    url: "https://www.facebook.com/",
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
  var time = new Date(reply.timestamp * 1000);
  return (
    <div className="m-5">
      <div className="flex items-center">
        <span className="font-medium">{reply.username}</span>
        <span className="ml-2 mr-2 text-gray-500 text-sm">
          {time.toLocaleString()}
        </span>
        <span>@{reply.gid}</span>
      </div>
      <div className="pt-1">
        <p className="text-gray-500 text-sm">{reply.message}</p>
      </div>
    </div>
  );
};

const LinksItem = ({ link }) => {
  return (
    <div className="transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
      <SocialIcon url={link.url} target="_blank" className="mr-2" />
    </div>
  );
};

const SocialInput = ({ link }) => {
  return (
    <div className="mb-2 grid grid-cols-3 gap-6">
      <div className="col-span-3 sm:col-span-2">
        <label className="ml-3 block text-sm font-medium text-gray-700">
          {link.title}
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
            {" "}
            http://{" "}
          </span>
          <input
            type="text"
            name="company-website"
            id="company-website"
            className="focus:ring-indigo-500 focus:border-indigo-500 border-solid border flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
            placeholder=" www.example.com"
          />
        </div>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  const { username } = useParams();
  let newUsername = username.substring(1);
  let fullUsername = newUsername + "@gmail.com";
  const { user } = useContext(userContext);
  let [isOpen, setIsOpen] = useState(false);
  const [userToRender, setUserToRender] = useState({});
  const [comments, setComments] = useState([]);
  let currUsername;
  if (user) {
    const currUsernameStr = user.email.toString();
    currUsername = currUsernameStr.substring(0, currUsernameStr.indexOf("@"));
  }

  useEffect(() => {
    if (currUsername) {
      newUsername == currUsername
        ? getUserCallback(setUserToRender)
        : getOtherUserCallback(fullUsername, setUserToRender);
    }
  }, [user]);

  useEffect(() => {
    getRecentCommentsCallback(userToRender.uid, setComments);
  }, [userToRender]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return userToRender ? (
    <div className="flex justify-center mt-20">
      <div className="flex flex-col">
        <div className="flex">
          <div className="flex flex-col mr-20">
            <div className="flex justify-start h-56 px-5">
              <img src={avatar} className="h-56 w-52 mt-5" />
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="w-52 h-8 ml-5 mt-8 font-medium bg-purple-600 hover:bg-purple-500 text-white rounded"
            >
              Edit Profile
            </button>
          </div>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={() => setIsOpen(false)}
            >
              <form onSubmit={handleSubmit}>
                <div className="min-h-screen px-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Dialog.Overlay className="fixed inset-0" />
                  </Transition.Child>

                  <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Edit Profile
                      </Dialog.Title>

                      <div className="mt-2">
                        <p className="mt-5 mb-1 text-sm text-black-500">
                          Website
                        </p>
                        {Object.entries(socialLinks).map(([key, link]) => (
                          <SocialInput key={key} link={link} />
                        ))}
                        <div className="mt-5">
                          <label className="text-sm text-gray-500">About</label>
                          <div className="mt-1">
                            <textarea
                              id="about"
                              name="about"
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                              placeholder="Type something here..."
                            ></textarea>
                          </div>
                          <p className="mt-2 text-sm text-gray-500">
                            Brief description for your profile. URLs are
                            hyperlinked.
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          type="submit"
                          className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-black bg-white-600 border border-black rounded-md hover:bg-white-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={() => setIsOpen(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </form>
            </Dialog>
          </Transition>
          <div className="grid grid-cols-1 mt-5">
            <span className="font-bold flex text-lg">
              {userToRender.username}
            </span>
            <div className="grid grid-cols-1 divide-y divide-gray-300 -mt-8">
              <div className="flex">
                {Object.entries(socialLinks).map(([key, value]) => (
                  <div className="flex justify-start" key={key}>
                    <LinksItem link={value} />
                  </div>
                ))}
              </div>
              <div className="max-w-md">
                <h2 className="mt-4 italic font-serif">
                  {"'"}Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris nisi ut aliquip ex ea commodo consequat.{"'"}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-20">
          <div className="border-b-4 w-24 border-purple-600 pb-2 mb-3">
            <span className="font-semibold text-gray-700">Comments</span>
          </div>
          <div className="grid grid-cols-1 divide-y text-gray">
            {comments &&
              comments.map((comment, i) => (
                <div className="flex justify-right" key={i}>
                  <ReplyItem reply={comment} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
