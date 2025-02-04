import React from "react";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const LandingPage = () => (
    <div className="App">
      <Navbar />
      <Hero />
    </div>
);

export default LandingPage;
