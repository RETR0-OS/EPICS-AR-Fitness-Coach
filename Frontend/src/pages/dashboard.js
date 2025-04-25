import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  CalendarIcon, 
  ChartBarIcon, 
  UserIcon, 
  AdjustmentsHorizontalIcon, 
  FireIcon 
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([
    { id: 1, name: 'Full Body Workout', date: '2025-03-10', duration: '45 min', progress: 80 },
    { id: 2, name: 'Upper Body Focus', date: '2025-03-08', duration: '30 min', progress: 100 },
    { id: 3, name: 'Core Strengthening', date: '2025-03-05', duration: '20 min', progress: 100 },
  ]);
  
  const stats = [
    { name: 'Workouts Completed', value: '24', icon: <FireIcon className="w-6 h-6" /> },
    { name: 'Form Score', value: '8.7/10', icon: <ChartBarIcon className="w-6 h-6" /> },
    { name: 'Weekly Goal', value: '75%', icon: <AdjustmentsHorizontalIcon className="w-6 h-6" /> },
    { name: 'Streak', value: '5 days', icon: <CalendarIcon className="w-6 h-6" /> },
  ];

  return (
    <div className="relative min-h-screen">
    <div className="absolute top-8 right-8 z-10">
        <Link href="/profile" className="block">
        <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors duration-200">
        <UserIcon className="w-8 h-8 text-gray-700 hover:text-black" />
        </div>
     </Link>
</div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      {/* Welcome Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-black mb-2">Welcome back, Sarah</h1>
        <p className="text-xl text-gray-600">Ready for your workout today?</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center mb-2">
              <div className="p-2 bg-black bg-opacity-5 rounded-lg mr-4">
                {stat.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-500">{stat.name}</h3>
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/workout/new">
            <button className="btn-primary">Start New Workout</button>
          </Link>
          <Link href="/profile">
            <button className="btn-secondary">View Profile</button>
          </Link>
          <Link href="/dashboard">
            <button className="btn-secondary">See Progress</button>
          </Link>
        </div>
      </div>

      {/* Recent Workouts */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Recent Workouts</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-left text-lg font-medium text-gray-500">Workout</th>
                <th className="px-6 py-4 text-left text-lg font-medium text-gray-500">Date</th>
                <th className="px-6 py-4 text-left text-lg font-medium text-gray-500">Duration</th>
                <th className="px-6 py-4 text-left text-lg font-medium text-gray-500">Progress</th>
                <th className="px-6 py-4 text-right text-lg font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout.id} className="border-b border-gray-100">
                  <td className="px-6 py-4">
                    <div className="font-medium">{workout.name}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{workout.date}</td>
                  <td className="px-6 py-4 text-gray-600">{workout.duration}</td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-black h-2.5 rounded-full" 
                        style={{ width: `${workout.progress}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/workout/${workout.id}`}>
                      <button className="text-black hover:underline">Details</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;