import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

const LogIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        // Redirect to home page or dashboard after successful login
        router.push('/apphome');
      } else {
        setError(result.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-bl from-gray-900 to-black flex items-center justify-center text-white">
      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
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
        <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
        <p className="text-sm text-gray-400 text-center mt-2">Log in to access your account</p>

        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-100 px-4 py-2 rounded mt-4">
            {error}
          </div>
        )}

        {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mt-4">
            {success}
        </div>
        )}

        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
              required
            />
          </div>

          <div className="mt-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-10 text-gray-400"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? "🙈" : "👁️"}
            </button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <label className="inline-flex items-center text-sm text-gray-300">
              <input
                type="checkbox"
                className="form-checkbox rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="ml-2">Remember Me</span>
            </label>
            <a href="#" className="text-sm text-blue-400 hover:underline">Forgot Password?</a>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn-primary w-full mt-6"
            disabled={loading}
            >
            {loading ? "Logging in..." : "Log In"}
          </motion.button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-400">
          Don't have an account? <a href="/signup" className="text-blue-400 hover:underline">Sign up here</a>
        </p>
      </motion.div>
    </div>
  );
};

export default LogIn;
