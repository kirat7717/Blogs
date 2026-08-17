import React from "react";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaXTwitter, 
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaLocationDot 
} from "react-icons/fa6";
import logoIcon from "../../assets/images/logo/logo-icon.svg";
// import logoText from "../../assets/images/logo/logo-text.svg"; // Uncomment if you plan to use it

function Footer() {
  return (
    // Added w-full and mt-auto to ensure it pushes to the bottom and spans the screen
    <footer className="w-full bg-[#212121] pt-16 pb-6 text-white mt-auto">
      {/* Added w-full and standardized responsive padding */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid Section: Improved tablet responsiveness (sm:grid-cols-2 lg:grid-cols-4) */}
        <div className="grid w-full grid-cols-1 gap-12 border-b border-gray-700 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Brand & Socials */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-1">
              <img
                src={logoIcon}
                alt="Blogs Logo Icon"
                className="h-9 w-auto object-contain"
              />
              <span className="text-3xl font-bold tracking-tight">Blogs</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Most developer friendly & highly<br />
              customisable Admin Dashboard Template.
            </p>
            
            {/* Social Icons */}
            <div className="mt-4 flex gap-3">
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-colors duration-300 hover:bg-[#0083c9] hover:text-white">
                <FaFacebookF size={16} />
              </a>
              
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-colors duration-300 hover:bg-[#0083c9] hover:text-white">
                <FaInstagram size={16} />
              </a>
              
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-colors duration-300 hover:bg-[#0083c9] hover:text-white">
                <FaXTwitter size={16} />
              </a>
              
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-colors duration-300 hover:bg-[#0083c9] hover:text-white">
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-white">Company</h3>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li><a href="#" className="transition hover:text-white">About us</a></li>
              <li><a href="#" className="transition hover:text-white">Blogs</a></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-white">Quick Links</h3>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li><a href="#" className="transition hover:text-white">Terms of service</a></li>
              <li><a href="#" className="transition hover:text-white">Policy Privacy</a></li>
              <li><a href="#" className="transition hover:text-white">Get in touch</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-white">Contact Us</h3>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#0083c9]" /> info@companyname.com
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-[#0083c9]" /> (123) 456-789
              </li>
              <li className="flex items-start gap-3">
                <FaLocationDot className="mt-1 text-[#0083c9]" /> 
                <span>1234 Street Name, State,<br />Zip Code</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Section */}
        <div className="pt-6 text-center text-xs text-gray-500">
          <p>
            © 2026 <span className="font-bold text-gray-300">Blogs.</span> All rights reserved
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;