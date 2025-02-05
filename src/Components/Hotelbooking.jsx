import React, { useState } from "react";
import { Filter, X, ChevronDown, Plus } from "lucide-react";
import Subheadervenders from "./Subheadervenders";
import room from "../assets/Roombook/room.png";
import room1 from "../assets/Roombook/room1.png";
import star from "../assets/images/star.png";

const FilterSection = ({ section, expandedSection, setExpandedSection }) => (
  <div className="border-b border-gray-200 last:border-0">
    <button
      className="w-full flex items-center justify-between py-4 px-2 hover:bg-gray-50"
      onClick={() => setExpandedSection(expandedSection === section.title ? "" : section.title)}
    >
      <span className="font-medium text-gray-900">{section.title}</span>
      <ChevronDown
        className={`w-5 h-5 transition-transform duration-200 ${
          expandedSection === section.title ? "transform rotate-180" : ""
        }`}
      />
    </button>

    {expandedSection === section.title && (
      <div className="px-2 pb-4 space-y-2">
        {section.options.map((option) => (
          <label
            key={option.id}
            className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <input
              type="checkbox"
              id={option.id}
              className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <span className="text-sm">{option.label}</span>
          </label>
        ))}
      </div>
    )}
  </div>
);

const HotelBooking = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState("");

  const filterSections = [
    {
      title: "Suggested For You",
      options: [
        { id: "last_minute", label: "Last Minute Deals" },
        { id: "five_star", label: "5 Star" },
        { id: "unmarried", label: "Unmarried Couples Allowed" },
      ],
    },
    {
      title: "Price per Night",
      options: [
        { id: "price_0_4000", label: "₹0 - ₹4,000" },
        { id: "price_4000_8000", label: "₹4,000 - ₹8,000" },
        { id: "price_8000_12000", label: "₹8,000 - ₹12,000" },
        { id: "price_12000_15000", label: "₹12,000 - ₹15,000" },
        { id: "price_15000_30000", label: "₹15,000 - ₹30,000" },
        { id: "price_30000_plus", label: "₹30,000+" },
      ],
    },
    {
      title: "Star Category",
      options: [
        { id: "star_5", label: "5 Star" },
        { id: "star_4", label: "4 Star" },
        { id: "star_3", label: "3 Star" },
      ],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Subheadervenders />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Button for Mobile */}
          <button
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="w-5 h-5" />
            <span>Filter your search</span>
          </button>

          {/* Filter Sidebar */}
          <div
            className={`
              fixed md:relative top-0 left-0 h-full md:h-auto w-80 md:w-64
              bg-white shadow-lg md:shadow-sm transform transition-transform duration-300 z-50
              ${isFilterOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}
          >
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b">
              <span className="font-semibold">Filters</span>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Content */}
            <div className="p-4">
              {filterSections.map((section) => (
                <FilterSection
                  key={section.title}
                  section={section}
                  expandedSection={expandedSection}
                  setExpandedSection={setExpandedSection}
                />
              ))}

              {/* Apply Filters Button - Mobile Only */}
              <button
                className="md:hidden w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={() => setIsFilterOpen(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left Section: Image Gallery */}
                <div className="md:w-[279px]">
                  <div className="relative mb-4">
                    <img
                      src={room}
                      alt="Main room view"
                      className="w-full h-[199px] object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex gap-4">
                    {[1, 2, 3].map((index) => (
                      <div
                        key={index}
                        className="w-[81px] h-[56px] rounded-lg overflow-hidden"
                      >
                        <img
                          src={room1}
                          alt={`Room thumbnail ${index}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Middle Section: Hotel Details */}
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-3">
                    Diwana Plaza Krabi Aonang
                  </h2>

                  <div className="flex items-center gap-2 text-slate-500 mb-4">
                    <img src={star} alt="Rating star" className="w-5 h-5" />
                    <span>5.0 (85 reviews)</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                      Kids play area
                    </button>
                    <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                      Free shuttle services
                    </button>
                    <button className="flex items-center gap-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
                      <Plus className="w-4 h-4" />
                      <span>more</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-red-700 font-bold">Couple Friendly</p>
                    <p className="text-slate-500">
                      In-pool Jacuzzi, family rooms with bunk beds & playstation
                    </p>
                  </div>
                </div>

                {/* Right Section: Pricing and Booking */}
                <div className="md:border-l md:pl-6 pt-4 md:pt-0">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold">₹16,000</span>
                      <span className="text-sm text-slate-500 line-through">₹20,000</span>
                      <span className="text-sm text-slate-600">per night</span>
                    </div>
                    <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelBooking;