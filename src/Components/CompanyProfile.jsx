import { useState } from "react";
import { Calendar, Star, Target, MessageSquare } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [activeTab, setActiveTab] = useState("mission");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent by ${formData.name}`);
    // Add form submission logic here (e.g., API call)
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "mission":
        return (
          <div className="py-4">
            <p className="text-gray-700 leading-relaxed">
              One touch moment Events is committed to deliver the most creative
              and festive moment and cherished memories through our excellent
              and personalized services like no other without compromising the
              company's ideals and integrity.
            </p>
          </div>
        );
      case "values":
        return (
          <div className="py-4">
            <p className="font-medium mb-2">
              {" "}
              <strong className="text-red-500 text-xl">S</strong> = Safety,
              Quality, and Environmental performance and Commitment.
            </p>
            <p className="font-medium mb-2">
              {" "}
              <strong className="text-red-500 text-xl">T</strong> = Technically
              leading solutions and teamwork.
            </p>
            <p className="font-medium mb-2">
              {" "}
              <strong className="text-red-500 text-xl">A</strong> = Aim for
              continual improvement and exceeding our customers' expectations.
            </p>
            <p className="font-medium mb-2">
              {" "}
              <strong className="text-red-500 text-xl">R</strong> = Respect for
              our customer, employees, shareholders suppliers and the public.
            </p>
          </div>
        );
      case "goals":
        return (
          <div className="py-4">
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                To be one of the most well-known names in the industry of event
                planning.
              </li>
              <li>To produce top quality event services.</li>
              <li>To provide excellent and personalized service.</li>
              <li>
                To expand our business and to be able to establish branches in
                other areas.
              </li>
              <li>
                To cater event not only in our locality, but also in
                neighbouring localities.
              </li>
            </ol>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side - Images */}
        <div className="relative">
          {/* Bunting top left */}
        

          {/* Main event table image */}
          <div className="rounded-2xl overflow-hidden mb-4">
            <img
              src="https://onetouchmoments.co.in/wp-content/uploads/2024/05/2149617115.jpg"
              alt="Event table setup"
              className="w-full h-full object-cover aspect-square"
            />
          </div>

          {/* Musical notes bottom left */}
          <div className="absolute -bottom-4 left-6 z-10">
            <span className="text-2xl">♪ ♫</span>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="relative">
          {/* Event flag */}
          

          {/* Company brief */}
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-red-600 mb-2">
              Company Brief
            </h2>
            <h1 className="text-4xl font-bold text-teal-800 mb-8">
              Make your Moments in one touch.
            </h1>

            {/* Tabs */}
            <div className="mb-4 border border-dashed border-black rounded-full p-1 flex justify-between">
              <button
                className={`py-2 px-4 rounded-full font-medium ${
                  activeTab === "mission"
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-800"
                }`}
                onClick={() => setActiveTab("mission")}
              >
                OUR MISSION
              </button>
              <button
                className={`py-2 px-4 rounded-full font-medium ${
                  activeTab === "values"
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-800"
                }`}
                onClick={() => setActiveTab("values")}
              >
                OUR VALUES
              </button>
              <button
                className={`py-2 px-4 rounded-full font-medium ${
                  activeTab === "goals"
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-800"
                }`}
                onClick={() => setActiveTab("goals")}
              >
                OUR GOALS
              </button>
            </div>

            {/* Tab content */}
            {renderTabContent()}
          </div>

          {/* Company logo */}
         
        </div>
      </div>

      {/* Make Appointment Section */}
      <div className="max-w-6xl mx-auto p-6 bg-white mt-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-500 pb-6">
            Make Appointment
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700">
            Make your moments in one touch. We handle your corporate events,
            Weddings, Birthdays, Private events & all details involved with the
            events process so you can focus on what's important to you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <MessageSquare className="text-red-500 mr-2" size={20} />
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />

              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows="4"
                required
              ></textarea>

              <button
                type="submit"
                className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="h-64 w-full rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d234675.64946367833!2d77.08999584632448!3d23.213702362124724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sotm%20bhopal!5e0!3m2!1sen!2sin!4v1741785418590!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
