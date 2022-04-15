import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useState } from "react";

import Loader from "./Loader";
import avatar from "../avatar-placeholder.png";
import axios from "axios";
import { userContext } from "./userContext";

// Note to frontend: in the request below you should add the uid as
// a parameter in place of the "0". The request returns the profile
// information related to the user with the given uid.
const getUserCallback = () => {
  axios
    .get("http://localhost:3500/user")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Note to frontend: in this request below you should add the uid as
// a parameter in place of the "0". The request returns the list of games
// that the user has rated. This should be added below the profile to show
// a view of the games the user rated.
const getRatedGamesCallback = () => {
  axios
    .get("http://localhost:3500/rated-games/0")
    .then((res) => {
      console.log(res.data);
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
      "http://localhost:3500/add-user/0",
      {},
      {
        headers: { "Content-Type": "application/json" },
        params: {
          username: "Test Username",
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

const socialLinks = {
  discord: {
    title: "Discord",
  },
  facebook: {
    title: "Facebook",
  },
  twitch: {
    title: "Twitch",
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

const SocialInput = ({ link }) => {
  return (
    <div className="mb-2 grid grid-cols-3 gap-6">
      <div className="col-span-3 sm:col-span-2">
        <label className="ml-3 block text-sm font-medium text-gray-700">
          {link.title}
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
            {" "}
            http://{" "}
          </span>
          <input
            type="text"
            name="company-website"
            id="company-website"
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
            placeholder="www.example.com"
          />
        </div>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  const { user } = useContext(userContext);
  let [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
            <button
              onClick={() => setIsOpen(true)}
              className="w-40 h-8 ml-5 mt-8 font-medium bg-purple-600 hover:bg-purple-500 text-white rounded"
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
                        <p className="mt-5 mb-1 text-sm text-gray-500">
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
                              placeholder="you@example.com"
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
