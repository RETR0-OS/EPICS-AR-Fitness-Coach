import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

const ProfilePage = () => {
  const router = useRouter();
  const [age, setAge] = useState("");
  const [level, setLevel] = useState("");
  const [frequency, setFrequency] = useState("");
  const [injury, setInjury] = useState("");
  const [location, setLocation] = useState([]);
  const [locationOther, setLocationOther] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const handleLocationChange = (value) => {
    setLocation((prev) =>
      prev.includes(value) ? prev.filter((loc) => loc !== value) : [...prev, value]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      age,
      level,
      frequency,
      injury,
      location,
      locationOther: location.includes("Other") ? locationOther : "",
      weight,
      height,
    });
  };

  // Function to ensure no negative values
  const handlePositiveInput = (setter) => (e) => {
    const value = e.target.value;
    if (value >= 0 || value === "") {
      setter(value);
    }
  };

  return (
    <div className="bg-white">
      <Navbar />
      <main className="py-32 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h1 className="text-5xl font-bold text-black text-center mb-4">My Profile</h1>
          <p className="text-xl text-gray-600 text-center mb-8">
            Fill in your details to personalize your experience
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label className="block text-lg font-medium text-black mb-2">Age</label>
              <input
                type="number"
                value={age}
                onChange={handlePositiveInput(setAge)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-black mb-2">Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                required
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-medium text-black mb-2">
                Frequency (Days per Week)
              </label>
              <input
                type="number"
                value={frequency}
                onChange={handlePositiveInput(setFrequency)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-black mb-2">Injuries</label>
              <input
                type="text"
                value={injury}
                onChange={(e) => setInjury(e.target.value)}
                placeholder="Enter any injuries"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-black mb-2">Workout Location</label>
              <div className="space-y-2">
                {["Home", "Gym", "Park", "Other"].map((loc) => (
                  <div key={loc} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={location.includes(loc)}
                      onChange={() => handleLocationChange(loc)}
                      className="mr-2 h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                    />
                    <span className="text-gray-700">{loc}</span>
                  </div>
                ))}
                {location.includes("Other") && (
                  <input
                    type="text"
                    placeholder="Specify location"
                    value={locationOther}
                    onChange={(e) => setLocationOther(e.target.value)}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-black mb-2">Weight (lbs)</label>
              <input
                type="number"
                value={weight}
                onChange={handlePositiveInput(setWeight)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-black mb-2">Height (inches)</label>
              <input
                type="number"
                value={height}
                onChange={handlePositiveInput(setHeight)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-md mt-8 transition-colors duration-200"
            >
              Save Profile
            </motion.button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default ProfilePage;
