import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => (
  <div>
    <h1>Login Page</h1>
    <Link to="/signup">Don't have an account? Sign up</Link>
  </div>
);

export default LoginPage;
