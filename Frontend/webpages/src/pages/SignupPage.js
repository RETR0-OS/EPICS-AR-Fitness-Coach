import React from "react";
import { Link } from "react-router-dom";

const SignupPage = () => (
  <div>
    <h1>Signup Page</h1>
    <Link to="/login">Already have an account? Login</Link>
  </div>
);

export default SignupPage;
