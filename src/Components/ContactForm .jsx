import { useState } from "react";
import { Mail, User, MessageSquare, Send, MapPin, Phone, Clock } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent by ${formData.name}`);
    // Add form submission logic here (e.g., API call)
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-16">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Contact Us</h2>
        <div className="w-24 h-1 bg-red-500 mx-auto mt-2 mb-6"></div>
        
        <div className="py-8 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-red-500 pb-6">Make an Appointment</h2>
          <p className="text-gray-600 text-lg">
            We transform your moments with just one touch. Our expert team handles your corporate events, 
            weddings, birthdays, and private gatherings with meticulous attention to detail, 
            allowing you to focus on what truly matters to you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <MessageSquare className="text-red-500 mr-2" size={20} />
              Send Us a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <User className="absolute top-3 left-3 text-gray-400" size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="relative">
                <Mail className="absolute top-3 left-3 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="relative">
                <Phone className="absolute top-3 left-3 text-gray-400" size={18} />
                <input
                  type="text"
                  name="phone"
                  placeholder="Your Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <MessageSquare className="absolute top-3 left-3 text-gray-400" size={18} />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows="4"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition duration-300 flex items-center justify-center"
              >
                <Send className="mr-2" size={18} />
                Send Message
              </button>
            </form>
          </div>

          <div className="flex flex-col space-y-6">
            <div className="h-64 md:h-72 lg:h-80 w-full rounded-lg overflow-hidden shadow-md">
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
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <MapPin className="text-red-500 mr-2" size={20} />
                Contact Information
              </h3>
              
              <div className="space-y-4 text-gray-600">
                <p className="flex items-center">
                  <MapPin className="text-red-500 mr-3" size={18} />
                  <span>Plot No.170, near Indian bank, Behind Sargam Talkies, Zone-II, Maharana Pratap Nagar, Bhopal, Madhya Pradesh 462011</span>
                </p>
                <p className="flex items-center">
                  <Phone className="text-red-500 mr-3" size={18} />
                  <span>+91 98765 43210</span>
                </p>
                <p className="flex items-center">
                  <Mail className="text-red-500 mr-3" size={18} />
                  <span>info@yourcompany.com</span>
                </p>
                <p className="flex items-center">
                  <Clock className="text-red-500 mr-3" size={18} />
                  <span>Mon-Fri: 9:00 AM - 6:00 PM</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;