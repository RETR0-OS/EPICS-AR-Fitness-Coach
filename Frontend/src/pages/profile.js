import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

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

  return (
    <div className="w-screen h-screen bg-gradient-to-bl from-gray-900 to-black flex items-center justify-center text-white">
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
      >
        ← Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700"
      >
        <h1 className="text-3xl font-bold text-center">My Profile</h1>
        <p className="text-sm text-gray-400 text-center mt-2">
          Fill in your details to personalize your experience
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
              required
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Frequency (Days per Week)
            </label>
            <input
              type="number"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Injuries</label>
            <input
              type="text"
              value={injury}
              onChange={(e) => setInjury(e.target.value)}
              placeholder="Enter any injuries"
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Workout Location</label>
            <div className="space-y-1">
              {["Home", "Gym", "Park", "Other"].map((loc) => (
                <div key={loc} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={location.includes(loc)}
                    onChange={() => handleLocationChange(loc)}
                    className="mr-2"
                  />
                  <span className="text-gray-300">{loc}</span>
                </div>
              ))}
              {location.includes("Other") && (
                <input
                  type="text"
                  placeholder="Specify location"
                  value={locationOther}
                  onChange={(e) => setLocationOther(e.target.value)}
                  className="mt-2 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Weight (lbs)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(Math.max(0, e.target.value))}
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Height (inches)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(Math.max(0, e.target.value))}
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md mt-4"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
