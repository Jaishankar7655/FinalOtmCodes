import React, { useState } from "react";
import { XCircle, Volume2, VolumeX, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

const servicesData = [
  "Wedding Ceremonies",
  "Griha Pravesh",
  "Naming Ceremony",
  "Mundan",
  "Satyanarayan Katha",
  "Last Rites",
  "Puja & Havan",
  "Astrology Services",
];

const PanditRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [ceremonyImages, setCeremonyImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audioEnabled, setAudioEnabled] = useState({});

  // Handle Specializations
  const handleCheckboxChange = (service) => {
    setSelectedSpecializations((prev) =>
      prev.includes(service)
        ? prev.filter((item) => item !== service)
        : [...prev, service]
    );
  };

  // Handle Images
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setCeremonyImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(ceremonyImages[index].preview);
    setCeremonyImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle Videos
  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newVideos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2), // Size in MB
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

  // Form Submit
  const onSubmit = async (data) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const submitData = {
        ...data,
        specializations: selectedSpecializations,
        images: ceremonyImages.map((img) => img.file),
        videos: videos.map((vid) => vid.file),
      };

      console.log("Form submitted:", submitData);
      alert("Registration successful!");
    } catch (error) {
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-red-600 px-4 py-8 text-white text-center rounded-lg">
        <h1 className="text-4xl font-bold">Register as a Pandit with OTM!</h1>
        <p className="mt-2 text-red-100">
          Join our community of respected religious scholars
        </p>
      </div>

      <div className="md:w-[900px]  w-full mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit mobile number",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobile.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <input
                type="number"
                {...register("experience", {
                  required: "Experience is required",
                  min: {
                    value: 0,
                    message: "Experience cannot be negative",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              {errors.experience && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.experience.message}
                </p>
              )}
            </div>
          </div>

          {/* About Services */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              About Your Services
            </label>
            <textarea
              {...register("about", {
                required: "Please describe your services",
                minLength: {
                  value: 50,
                  message: "Please provide at least 50 characters",
                },
              })}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            {errors.about && (
              <p className="text-red-500 text-sm mt-1">
                {errors.about.message}
              </p>
            )}
          </div>

          {/* Specializations */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Specializations
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {servicesData.map((service, index) => (
                <label
                  key={index}
                  className="flex items-center p-3 border rounded-lg hover:bg-red-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedSpecializations.includes(service)}
                    onChange={() => handleCheckboxChange(service)}
                    className="h-4 w-4 text-red-600 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Ceremony Images
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <p className="text-sm text-gray-500">
                    Drop images here or click to upload
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
              {ceremonyImages.map((img, index) => (
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

          {/* Video Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Ceremony Videos
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <p className="text-sm text-gray-500">
                    Drop videos here or click to upload
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default PanditRegister;
