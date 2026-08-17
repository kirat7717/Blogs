import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

import logoIcon from "../../assets/images/logo/logo-icon.svg";
import logoText from "../../assets/images/logo/logo-text.svg";
import { useLogout } from "../../hooks/useLogout";
import { useState } from "react";

const Navbar = () => {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  const user = useSelector((state) => state.auth.user);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navlinkclass = ({ isActive }) => {
    return isActive
      ? "text-[#0083c9] font-medium"
      : "text-gray-700 hover:text-[#0083c9] transition-colors";
  };

  const handleLogout = useLogout();

  return (
    <header className="relative w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logoIcon}
            alt="Blogs"
            className="h-8 w-8"
          />

          <img
            src={logoText}
            alt="Blogs"
            className="h-6 w-auto"
          />
        </Link>

        {/* Desktop View */}
        <div className="hidden md:flex md:items-center md:gap-8">

          <nav>
            <ul className="flex items-center gap-8 text-sm font-semibold">

              <li>
                <NavLink to="/" className={navlinkclass}>
                  Home
                </NavLink>
              </li>

              {isAuthenticated && (
                <>
                  <li>
                    <NavLink
                      to="/my-blogs"
                      className={navlinkclass}
                    >
                      My Blogs
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/chat"
                      className={navlinkclass}
                    >
                      Chat
                    </NavLink>
                  </li>
                </>
              )}

              <li>
                <NavLink
                  to="/contact"
                  className={navlinkclass}
                >
                  Contact Us
                </NavLink>
              </li>

            </ul>
          </nav>

          {/* Authentication Section */}
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="rounded-md bg-[#0083c9] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
            >
              Sign In
            </Link>
          ) : (
            <div className="flex items-center gap-4">

              {/* Profile */}
              <Link
                to="/profile"
                className="group flex items-center gap-2"
                title={user?.username || "Profile"}
              >

                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user?.username || "Profile"}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle
                    className="text-gray-500 transition-colors group-hover:text-[#0083c9]"
                    size={30}
                  />
                )}

                <span className="text-sm font-medium text-gray-700">
                  {user?.username || "Profile"}
                </span>

              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600"
              >
                Logout
              </button>

            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() =>
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }
            className="text-gray-600 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <FiX size={28} />
            ) : (
              <FiMenu size={28} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-full z-50 w-full border-b border-gray-100 bg-white px-4 py-6 shadow-lg md:hidden">

          <nav className="mb-6">
            <ul className="flex flex-col gap-4 text-base font-semibold">

              <li>
                <NavLink
                  to="/"
                  className={navlinkclass}
                  onClick={() =>
                    setIsMobileMenuOpen(false)
                  }
                >
                  Home
                </NavLink>
              </li>

              {isAuthenticated && (
                <>
                  <li>
                    <NavLink
                      to="/my-blogs"
                      className={navlinkclass}
                      onClick={() =>
                        setIsMobileMenuOpen(false)
                      }
                    >
                      My Blogs
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/chat"
                      className={navlinkclass}
                      onClick={() =>
                        setIsMobileMenuOpen(false)
                      }
                    >
                      Chat
                    </NavLink>
                  </li>
                </>
              )}

              <li>
                <NavLink
                  to="/contact"
                  className={navlinkclass}
                  onClick={() =>
                    setIsMobileMenuOpen(false)
                  }
                >
                  Contact Us
                </NavLink>
              </li>

            </ul>
          </nav>

          {/* Mobile Authentication */}
          {!isAuthenticated ? (
            <Link
              to="/login"
              onClick={() =>
                setIsMobileMenuOpen(false)
              }
              className="block w-full rounded-md bg-[#0083c9] px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-sky-600"
            >
              Sign In
            </Link>
          ) : (
            <div className="flex flex-col gap-4 border-t border-gray-100 pt-4">

              {/* Mobile Profile */}
              <Link
                to="/profile"
                onClick={() =>
                  setIsMobileMenuOpen(false)
                }
                className="flex items-center gap-3"
              >

                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user?.username || "Profile"}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle
                    className="text-gray-500"
                    size={30}
                  />
                )}

                <span className="text-base font-medium text-gray-700">
                  {user?.username || "Profile"}
                </span>

              </Link>

              {/* Mobile Logout */}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full rounded-md bg-red-500 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-red-600"
              >
                Logout
              </button>

            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;