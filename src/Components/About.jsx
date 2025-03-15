import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    {
      src: "https://onetouchmoments.co.in/wp-content/uploads/2022/01/blog-single-1.jpg",
      alt: "Children playing with colorful building blocks",
      caption: "Creating memorable moments for families",
    },
    {
      src: "https://wordpress.vecurosoft.com/knirpse/wp-content/uploads/2022/01/shape-slide-2.png",
      alt: "Elegant wedding setup",
      caption: "Crafting dream weddings",
    },
    {
      src: "https://wordpress.vecurosoft.com/knirpse/wp-content/uploads/2022/01/shape-slide-3.png",
      alt: "Corporate event with presentations",
      caption: "Professional corporate events",
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  // Services from the image
  const services = [
    { name: "Hotel/Resort/Farm House", icon: "🏨" },
    { name: "Videography & Photography", icon: "📸" },
    { name: "Decoration", icon: "✨" },
    { name: "Tour & Travel", icon: "✈️" },
    { name: "Catering", icon: "🍽️" },
    { name: "Varmala Entry", icon: "💐" },
    { name: "Tent House", icon: "⛺" },
    { name: "Makeup Artist", icon: "💄" },
    { name: "Pandit", icon: "🙏" },
    { name: "Wedding Dress", icon: "👰" },
    { name: "Entertainment", icon: "🎭" },
    { name: "DJ / Dhol / Band", icon: "🎵" },
    { name: "Mehandi Artist", icon: "🌿" },
    { name: "Choreographer", icon: "💃" },
    { name: "Anchor", icon: "🎤" },
  ];

  return (
    <div className="max-w-6xl mx-auto bg-cream-50 min-h-screen mt-20">
      {/* Header Section */}
      <div className="bg-red-500 text-white py-2 px-4">
        <div className="max-w-6xl mx-auto flex justify-end">
          <span className="text-sm font-medium">Call us: +91 1234567890</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 md:p-12">
        {/* Top Section */}
        <div className="text-red-500 font-bold text-xl mb-4">More About Us</div>

        {/* Hero Section with Flex Layout */}
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          {/* Left Column - Text */}
          <div className="md:w-1/2">
            <h1 className="text-5xl font-black text-gray-900 mb-8">
              Make your moments in one touch.
            </h1>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              One Touch Moment Events believes to listen, understand and
              anticipate the client preferences and provide excellent services
              according to the client needs. It is a full-service event
              management company that specializes in weddings, birthdays,
              corporate events, seminars and private events.
            </p>

            <Link to="/ContactForm">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-10 rounded-full transition-all">
                Learn More
              </button>
            </Link>
          </div>

          {/* Right Column - Carousel */}
          <div className="md:w-1/2 relative">
            <div className="relative overflow-hidden rounded-2xl aspect-video shadow-xl">
              {/* Image Carousel */}
              <div
                className="flex transition-transform duration-500 ease-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {carouselImages.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0 relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <p className="text-white font-medium">{image.caption}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Controls */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full hover:bg-opacity-100 transition-all"
              >
                <ArrowLeft size={20} />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full hover:bg-opacity-100 transition-all"
              >
                <ArrowRight size={20} />
              </button>

              {/* Dots indicator */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full ${
                      currentSlide === index ? "bg-white" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-300 rounded-full opacity-50"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-red-300 rounded-full opacity-40"></div>
          </div>
        </div>

        {/* Our Services Section - Updated to match image */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 relative">
            <span className="bg-red-500 text-white px-6 py-3 rounded-r-full">Our Services</span>
          </h2>

          <div className="bg-white shadow-lg rounded-lg p-8 relative overflow-hidden">
            {/* Red design element similar to image */}
            <div className="absolute -top-2 left-0 w-full h-4 bg-red-500"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
              {services.map((service, index) => (
                <div key={index} className="flex items-center space-x-3 group cursor-pointer">
                  <span className="text-red-500 font-bold">»</span>
                  <div>
                    <div className="flex items-center">
                      <span className="mr-2">{service.icon}</span>
                      <span className="font-medium text-gray-800 group-hover:text-red-500 transition-colors">{service.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Google Play badge at the bottom, similar to image */}
            <div className="mt-8 flex justify-end">
              <a href="#" className="flex items-center bg-black text-white px-4 py-2 rounded-lg">
                <span className="mr-2">GET IT ON</span>
                <span className="font-medium">Google Play</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;