import React, { useState } from "react";
import { XCircle, Volume2, VolumeX, Loader2 } from "lucide-react";

const servicesData = [
  "Wedding Photography",
  "Event Photography",
  "Portrait Photography",
  "Fashion Photography",
  "Product Photography",
  "Drone Photography",
  "Cinematography",
  "Music Videos",
];

const PhotoVideo = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    experience: "",
    House: "",
    City: "",
    nearby: "",
    District: "",
    State: "",
    Pincode: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audioEnabled, setAudioEnabled] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.fullName) newErrors.fullName = "Firm name is required";
    else if (formData.fullName.length < 3) newErrors.fullName = "Name must be at least 3 characters";
    
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    else if (!/^[0-9]{10}$/.test(formData.mobile)) newErrors.mobile = "Please enter a valid 10-digit mobile number";
    
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) newErrors.email = "Please enter a valid email address";
    
    if (!formData.experience) newErrors.experience = "Experience is required";
    
    if (!formData.House) newErrors.House = "House No /Flate No /Building No. is Required";
    
    if (!formData.City) newErrors.City = "City/Colony/village/street is required";
    
    if (!formData.nearby) newErrors.nearby = "nearby is required";
    
    if (!formData.District) newErrors.District = "District is required";
    
    if (!formData.State) newErrors.State = "State is required";
    
    if (!formData.Pincode) newErrors.Pincode = "Pincode is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckboxChange = (service) => {
    setSelectedSpecializations((prev) =>
      prev.includes(service)
        ? prev.filter((item) => item !== service)
        : [...prev, service]
    );
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setPortfolioImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(portfolioImages[index].preview);
    setPortfolioImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newVideos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2),
    }));
    setVideos((prev) => [...prev, ...newVideos]);
  };

  const removeVideo = (index) => {
    URL.revokeObjectURL(videos[index].preview);
    setVideos((prev) => prev.filter((_, i) => i !== index));
    setAudioEnabled((prev) => {
      const newState = { ...prev };
      delete newState[index];
      return newState;
    });
  };

  const toggleAudio = (index) => {
    setAudioEnabled((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const submitData = {
        ...formData,
        specializations: selectedSpecializations,
        images: portfolioImages.map((img) => img.file),
        videos: videos.map((vid) => vid.file),
      };

      console.log("Form submitted:", submitData);
      alert("Registration successful!");
    } catch (error) {
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add the specializations section that was missing
  const renderSpecializations = () => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Your Specializations
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {servicesData.map((service) => (
          <div key={service} className="flex items-center">
            <input
              type="checkbox"
              id={service}
              checked={selectedSpecializations.includes(service)}
              onChange={() => handleCheckboxChange(service)}
              className="h-4 w-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
            />
            <label htmlFor={service} className="ml-2 text-sm text-gray-700">
              {service}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-red-50 p-6">
      <div className="bg-gradient-to-r from-red-500 to-red-500 px-4 py-8 text-white text-center rounded-lg">
        <h1 className="text-4xl font-bold">
          Join OTM as a Photo/Video Professional!
        </h1>
        <p className="mt-2 text-red-100">
          Capture beautiful moments and create lasting memories for thousands of
          clients
        </p>
      </div>

      <div className="md:w-[900px] w-full mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Firm name
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobile}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              {errors.experience && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.experience}
                </p>
              )}
            </div>
          </div>

          {/* Address Details  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                House No /Flate No /Building No.
              </label>
              <input
                name="House"
                value={formData.House}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              {errors.House && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.House}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City/Colony/village/street
              </label>
              <input
                name="City"
                value={formData.City}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              {errors.City && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.City}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                nearby/landmark
              </label>
              <input
                name="nearby"
                value={formData.nearby}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              {errors.nearby && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nearby}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District
              </label>
              <input
                type="text"
                name="District"
                value={formData.District}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              {errors.District && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.District}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                name="State"
                value={formData.State}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              {errors.State && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.State}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pin Code
              </label>
              <input
                type="number"
                name="Pincode"
                value={formData.Pincode}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              {errors.Pincode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.Pincode}
                </p>
              )}
            </div>
          </div>

          {/* Render the specializations section */}
          {renderSpecializations()}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Portfolio Images
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-red-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <p className="text-sm text-gray-500">
                    Drop your best photography work or click to upload
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {portfolioImages.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Video Portfolio & Cinematography Samples
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-red-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <p className="text-sm text-gray-500">
                    Drop your cinematography samples or click to upload
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {videos.map((video, index) => (
                <div key={index} className="relative bg-gray-50 rounded-lg p-4">
                  <div className="relative">
                    <video
                      className="w-full rounded-lg"
                      src={video.preview}
                      controls
                      muted={!audioEnabled[index]}
                    />
                    <button
                      type="button"
                      onClick={() => toggleAudio(index)}
                      className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-lg"
                    >
                      {audioEnabled[index] ? (
                        <Volume2 size={20} />
                      ) : (
                        <VolumeX size={20} />
                      )}
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {video.name}
                      </p>
                      <p className="text-xs text-gray-500">{video.size} MB</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeVideo(index)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-500 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2" size={20} />
                Registering...
              </span>
            ) : (
              "Complete Registration"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PhotoVideo;