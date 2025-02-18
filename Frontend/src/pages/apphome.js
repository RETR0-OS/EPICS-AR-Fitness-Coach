import Navbar from "@/components/Navbar";
import WebcamCapture from "@/components/WebcamCapture";

// pages/app-home.js
const AppHome = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20"> {/* Add padding-top to account for fixed navbar */}
        <WebcamCapture />
      </div>
    </div>
  );
};

export default AppHome;