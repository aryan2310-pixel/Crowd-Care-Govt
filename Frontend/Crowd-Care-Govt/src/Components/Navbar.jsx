import React from 'react';
import { NavLink } from 'react-router-dom';

const navLinkBase = `
  text-sm text-gray-700 px-3 py-1 transition 
  transform duration-300 ease-in-out 
  hover:text-black hover:scale-110
`;

const navLinkActive = `
  text-black font-semibold border-b-2 border-black 
  scale-110
`;

const Navbar = () => {
  return (
    <nav className="w-full h-14 bg-white border-b flex items-center justify-between px-8">
      {/* Clickable Logo and App Name */}
      <NavLink to="/dashboard" className="flex items-center space-x-2">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="4" fill="#18181B" />
        </svg>
        <span className="font-semibold text-base text-gray-900">Citizen Connect</span>
      </NavLink>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            isActive ? `${navLinkBase} ${navLinkActive}` : navLinkBase
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive ? `${navLinkBase} ${navLinkActive}` : navLinkBase
          }
        >
          Analytics
        </NavLink>

        {/* Notification Bell */}
        <button className="mx-2">
          <svg
            className="w-5 h-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 2a6 6 0 016 6v4.25l.97 1.94A1 1 0 0116.97 17H3.03a1 1 0 01-.89-1.56L3 12.25V8a6 6 0 017-6z" />
          </svg>
        </button>

        {/* User Avatar */}
        <img
          src="https://randomuser.me/api/portraits/women/50.jpg"
          alt="user avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>
    </nav>
  );
};

export default Navbar;
