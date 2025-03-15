import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import about from "../assets/home/about.jpg"

const HomeAbout = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side content */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-red-100 rounded-full opacity-50"></div>
            
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border-l-4 border-red-500 relative z-10">
              <div className="inline-block bg-red-50 px-4 py-1 rounded-full mb-6">
                <h2 className="text-sm font-semibold text-red-500 tracking-wide uppercase">Who We Are</h2>
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                About <span className="text-red-500 relative">
                  Us
                  <span className="absolute bottom-0 left-0 w-full h-2 bg-red-100"></span>
                </span>
              </h2>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 italic">
                Make your moments in one touch.
              </h3>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                One Touch Moment Events believes in listening, understanding, and
                anticipating client preferences to provide excellent services
                according to the client needs. We are a full-service event
                management company that specializes in weddings, birthdays,
                corporate events, seminars and private events.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">
                      Professional Event Planning
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">Personalized Service</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">Attention to Detail</span>
                  </li>
                </ul>
              </div>
              
              <Link to="/About-us">
                <button className="group flex items-center px-8 py-4 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg">
                  <span>Learn More About Us</span>
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
            
         
          </div>
          
          {/* Right side - Image collage */}
         <img className="w-full h-full rounded-lg" src={about} alt="" />
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;