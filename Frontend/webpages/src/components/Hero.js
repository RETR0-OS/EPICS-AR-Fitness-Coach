import React from 'react';
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="hero">
      <h2>Welcome to AR Fitness Trainer</h2>
      <p>Use our AR Fitness Trainer to track your form and improve your workouts.</p>
      <Link to="/home">
        <button>Get Started</button>
      </Link>
    </div>
  );
}

export default Hero;