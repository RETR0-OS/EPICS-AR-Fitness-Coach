import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    console.log(formData);
    setError("");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center max-w-2xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-6xl font-bold text-black mb-8 leading-tight"
            >
              Create Your Account
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-12"
            >
              Sign up to get started with personalized workouts and real-time form correction.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                {[
                  { id: "firstName", placeholder: "Enter first name" },
                  { id: "lastName", placeholder: "Enter last name" },
                  { id: "email", placeholder: "Enter email" },
                  { id: "password", placeholder: "Enter password" },
                  { id: "confirmPassword", placeholder: "Re-enter password" },
                ].map(({ id, placeholder }) => (
                  <div key={id} className="flex flex-col">
                <label htmlFor={id} className="text-left capitalize block text-lg font-semibold text-black mb-2">
                {id.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type={id.includes("password") ? "password" : "text"}
                      id={id}
                      value={formData[id]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className="form-input"
                      required
                    />
                  </div>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="btn-primary w-full mt-4"
                >
                  Sign Up
                </motion.button>
              </form>
              <p className="mt-6 text-sm text-center text-gray-500">
                Already have an account?{" "}
                <a href="/login" className="text-black font-medium hover:underline">
                  Log in here
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;