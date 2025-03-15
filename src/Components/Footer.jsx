import React from "react";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-28">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-semibold mb-3">About Us</h2>
          <p className="text-gray-400 text-sm">
            India's leading event management platform connecting users with
            top-rated vendors for weddings, parties, and corporate events.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>
              <a href="#" className="hover:text-red-400">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-400">
                Vendors
              </a>
            </li>
            <li>
              <a href="/ContactForm" className="hover:text-red-400">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:text-red-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms-and-conditions" className="hover:text-red-400">
                terms and condition
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p className="text-gray-400 text-sm flex items-center justify-center md:justify-start gap-2">
            <Phone className="w-5 h-5" /> +91 9893919163
          </p>
          <p className="text-gray-400 text-sm flex items-center justify-center md:justify-start gap-2 mt-2">
            <Mail className="w-5 h-5" /> info@onetouchmoments.com
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <Link href="#" className="hover:text-red-400">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.instagram.com/otm_onetouchmoments"
              target="_blank"
              className="hover:text-red-400"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-red-400">
              <Twitter className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Event Management Platform. All rights
        reserved.
      </div>
    </footer>
  );
}

export default Footer;
