import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

const SignupPage = () => {
  const router = useRouter();
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
    <div className="w-screen h-screen bg-white flex flex-col">
      <Navbar />
      
      {/* Back Button Positioned Below Navbar */}
      <div className="w-full px-6 mt-6 pt-14">
        <button
          onClick={() => router.push("/")}
          className="btn-secondary"
        >
          ← Back
        </button>
      </div>

      <main className="flex flex-col items-center justify-center w-full flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 border border-gray-200 animate-slide-up"
        >
          <h2 className="text-3xl font-bold text-black text-center">
            Create Your Account
          </h2>
          <p className="text-gray-500 text-center mt-2">
            Sign up to get started
          </p>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {/* Input Fields with Placeholders */}
            {[
              { id: "firstName", placeholder: "Enter first name" },
              { id: "lastName", placeholder: "Enter last name" },
              { id: "email", placeholder: "Enter email" },
              { id: "password", placeholder: "Enter password" },
              { id: "confirmPassword", placeholder: "Re-enter password" },
            ].map(({ id, placeholder }) => (
              <div key={id} className="flex flex-col">
                <label htmlFor={id} className="form-label capitalize">
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

            {/* Sign Up Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn-primary w-full mt-4"
            >
              Sign Up
            </motion.button>
          </form>

          {/* Redirect to Login */}
          <p className="mt-6 text-sm text-center text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-black font-medium hover:underline">
              Log in here
            </a>
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default SignupPage;
