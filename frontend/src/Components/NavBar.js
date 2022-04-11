import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { userContext } from "./userContext";

const NavBar = () => {
  const location = useLocation();
  // const { user, setUser } = useContext(userContext);
  // const handleLogout = () => {
  //   setUser(null);
  //   console.log("logged out")
  // };
  return (
    <nav className="bg-gray-800">
      <div className="px-20 mx-auto">
        <div className="flex justify-between">
          <div className="flex py-2 px-3">
            <a href="/" className="flex items-center mr-5 text-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-1 text-red-700"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
              </svg>
              <span className="font-bold text-lg">GamerLink</span>
            </a>
            <div className="flex justify-center items-center">
              <div className="my-2 xl:w-96 bg-gray-100 rounded-r-full rounded-l-full shadow-lg text-base flex items-center justify-center py-1 space-x-2 hover:cursor-pointer px-8">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-gray-100 w-3/4 h-3/4 focus:outline-none flex-1"
                />
                <button
                  type="submit"
                  className="rounded-full flex justify-center items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-700 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {location.pathname == "/login" ? null : (
              <Link
                to="/login"
                className="py-1 px-3 font-sm bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded"
              >
                Login
              </Link>
            )}
            {/* <Button
              user={user}
              location={location}
              handleLogout={() => {}}
            /> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

// const Button = ({ user, location, handleLogout }) => {
//   if (user) {
//     return (
//       <Link
//         to="/"
//         className="py-1 px-3 font-sm bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded"
//         onClick={() => {}}
//       >
//         Logout
//       </Link>
//     );
//   } else {
//     return location.pathname == "/login" ? null : (
//       <Link
//         to="/login"
//         className="py-1 px-3 font-sm bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded"
//       >
//         Login
//       </Link>
//     );
//   }
// };

export default NavBar;
