import React, { useState } from 'react';
import { BiSolidUserCircle } from "react-icons/bi";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [user] = useState({ name: 'John Doe' });

  return (
    <nav className="bg-black shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-between">
            <div className="flex-shrink-0 text-white">
        
            <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-semibold sm:font-bold">
                CryptoTracker.
              </h1>
            </div>
            <div className="ml-3 relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-white"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                {/* <span className="sr-only">Open user menu</span> */}
                <BiSolidUserCircle className="h-8 w-8 md:h-10 md:w-10 lg:h-10 lg:w-10 rounded-full bg-white" />
                
              </button>
              {showMenu && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-2xl py-1 bg-black"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  <div
                    className="block px-4 py-2 text-sm text-white"
                    role="menuitem"
                    tabIndex="-1"
                  >
                    {user.name}
                  </div>
                  <div
                    className="block px-4 py-2 text-sm text-gray-600"
                    role="menuitem"
                    tabIndex="-1"
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
