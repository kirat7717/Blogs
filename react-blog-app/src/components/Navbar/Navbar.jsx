import { Link, NavLink } from "react-router-dom";

import logoIcon from "../../assets/images/logo/logo-icon.svg";
import logoText from "../../assets/images/logo/logo-text.svg";

const Navbar = () => {
  const navlinkclass = ({ isActive }) => {
    return isActive
      ? "text-[#0083c9] font-medium"
      : "text-gray-700 hover:text-[#0083c9] transition-colors";
  };

  return (
    <>
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
          {/* Logo Container */}
          <Link to="/">
            {" "}
            <div className="flex items-center gap-1">
              <img
                src={logoIcon}
                alt="Blogs Logo Icon"
                className="h-9 w-auto object-contain"
              />
              <img
                src={logoText}
                alt="Blogs"
                className="h-6 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Right Side (Navigation + Button) */}
          <div className="flex items-center gap-10">
            <nav>
              <ul className="flex items-center gap-8 text-sm font-semibold text-gray-700">
                <li>
                  {/* The active link is blue in the design */}
                  <NavLink to="/" className={navlinkclass}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/my-blogs"
                    className={navlinkclass}>
                    My Blogs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={navlinkclass}>
                    Contact us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/chat"
                    className={navlinkclass}>
                    chat
                  </NavLink>
                </li>
                
              </ul>
            </nav>

            <button className="rounded-md bg-[#0083c9] px-6 py-2.5 text-sm font-semibold text-white hover:bg-sky-600 transition-colors hover:cursor-pointer">
              <Link to="/login"> Sign In</Link>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
