// pages/profile.js
import Navbar from '../components/Navbar';

const ProfilePage = () => {
  return (
    <div>
      <Navbar />
      <main className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl md:text-6xl">
              Profile
            </h1>
            <p className="mt-3 max-w-4xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-2xl lg:mx-0">
              Manage your fitness goals and progress here.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;