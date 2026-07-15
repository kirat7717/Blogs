import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import logoIcon from "../../assets/images/logo/logo-icon.svg";
import logoText from "../../assets/images/logo/logo-text.svg";
function Footer() {
  return (
    <>
     <footer className="bg-[#212121] text-white pt-16 pb-6">
  <div className="mx-auto max-w-7xl px-8">
    
    {/* Top Grid Section */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-12">
      
      {/* Column 1: Brand & Socials */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-1">
          {/* Ensure logoIcon is imported in your file */}
          <img
            src={logoIcon}
            alt="Blogs Logo Icon"
            className="h-9 w-auto object-contain"
          />
          <span className="text-3xl font-bold tracking-tight">Blogs</span>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">
          Most developer friendly & highly<br />
          customisable Admin Dashboard Template.
        </p>
        
        {/* Social Icons */}
        <div className="flex gap-3 mt-4">
          <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black hover:bg-[#0083c9] hover:text-white transition-colors duration-300">
            <FaFacebookF size={16} />
          </a>
          
          <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black hover:bg-[#0083c9] hover:text-white transition-colors duration-300">
            <FaInstagram size={16} />
          </a>
          
          <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black hover:bg-[#0083c9] hover:text-white transition-colors duration-300">
            <FaXTwitter size={16} />
          </a>
          
          <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black hover:bg-[#0083c9] hover:text-white transition-colors duration-300">
            <FaLinkedinIn size={16} />
          </a>
        </div>
      </div>

      {/* Column 2: Company */}
      <div>
        <h3 className="mb-6 text-sm font-semibold text-white">Company</h3>
        <ul className="flex flex-col gap-4 text-sm text-gray-400">
          <li><a href="#" className="hover:text-white transition">About us</a></li>
          <li><a href="#" className="hover:text-white transition">Blogs</a></li>
        </ul>
      </div>

      {/* Column 3: Quick Links */}
      <div>
        <h3 className="mb-6 text-sm font-semibold text-white">Quick Links</h3>
        <ul className="flex flex-col gap-4 text-sm text-gray-400">
          <li><a href="#" className="hover:text-white transition">Terms of service</a></li>
          <li><a href="#" className="hover:text-white transition">Policy Privacy</a></li>
          <li><a href="#" className="hover:text-white transition">Get in touch</a></li>
        </ul>
      </div>

      {/* Column 4: Contact */}
      <div>
        <h3 className="mb-6 text-sm font-semibold text-white">Contact Us</h3>
        <ul className="flex flex-col gap-4 text-sm text-gray-400">
          <li className="flex items-center gap-3">
            <span>✉</span> info@companyname.com
          </li>
          <li className="flex items-center gap-3">
            <span>📞</span> (123) 456-789
          </li>
          <li className="flex items-start gap-3">
            <span>📍</span> 1234 Street Name, State,<br />Zip Code
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
    </>
  );
}

export default Footer;
