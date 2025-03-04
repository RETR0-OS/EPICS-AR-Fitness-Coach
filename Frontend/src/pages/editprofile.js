import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

const EditProfile = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    bio: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPEG, PNG, or GIF)');
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        alert('File size must be less than 5MB');
        return;
      }

      // Set the file for upload
      setAvatar(file);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);

      // Clean up the preview URL when component unmounts
      return () => URL.revokeObjectURL(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create a FormData object to handle file upload
      const formDataToSend = new FormData();
      
      // Append all form fields
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('bio', formData.bio);
      
      // Only append password fields if they're filled out
      if (formData.currentPassword && formData.newPassword && formData.confirmPassword) {
        // Validate passwords match
        if (formData.newPassword !== formData.confirmPassword) {
          alert('New passwords do not match!');
          return;
        }
        formDataToSend.append('currentPassword', formData.currentPassword);
        formDataToSend.append('newPassword', formData.newPassword);
      }

      // Append avatar if a new one was selected
      if (avatar) {
        formDataToSend.append('avatar', avatar);
      }

      // Make API call to update profile
      const response = await fetch('/api/profile/update', {
        method: 'PUT',
        body: formDataToSend,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update profile');
      }

      const result = await response.json();
      
      // Show success message
      alert('Profile updated successfully!');
      
      // Redirect to profile page
      router.push('/profile');

    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.message || 'Failed to update profile. Please try again.');
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <motion.main 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div 
          className="text-left max-w-3xl mb-16"
          variants={itemVariants}
        >
          <h1 className="text-5xl font-bold text-black mb-8 leading-tight">
            Edit Your Profile
          </h1>
          <p className="text-2xl text-gray-600">
            Customize your profile information and preferences
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="max-w-3xl">
          {/* Avatar Section */}
          <motion.div 
            className="mb-16"
            variants={itemVariants}
          >
            <div className="flex items-center gap-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span>No image</span>
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-black text-white p-3 rounded-full cursor-pointer hover:bg-gray-800 transition-all">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  📷
                </label>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-black mb-2">Profile Picture</h3>
                <p className="text-xl text-gray-600">Upload a new profile picture</p>
              </div>
            </div>
          </motion.div>

          {/* Personal Information */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            {['Full Name', 'Email Address'].map((label) => (
              <motion.div 
                key={label}
                variants={itemVariants}
              >
                <label className="text-xl font-semibold text-black mb-2 block">{label}</label>
                <input
                  type={label === 'Email Address' ? 'email' : 'text'}
                  name={label.toLowerCase().replace(/\s+/g, '')}
                  className="form-input text-xl"
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  onChange={handleInputChange}
                />
              </motion.div>
            ))}

            <motion.div variants={itemVariants}>
              <label className="text-xl font-semibold text-black mb-2 block">Bio</label>
              <textarea
                name="bio"
                rows="4"
                className="form-input text-xl !rounded-3xl"
                placeholder="Tell us about yourself"
                onChange={handleInputChange}
              />
            </motion.div>
          </motion.div>

          {/* Password Section */}
          <motion.div 
            className="mt-16 pt-16 border-t border-gray-200"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-black mb-8">Change Password</h2>
            <div className="space-y-8">
              {['Current Password', 'New Password', 'Confirm New Password'].map((label) => (
                <motion.div 
                  key={label}
                  variants={itemVariants}
                >
                  <label className="text-xl font-semibold text-black mb-2 block">{label}</label>
                  <input
                    type="password"
                    name={label.toLowerCase().replace(/\s+/g, '')}
                    className="form-input text-xl"
                    placeholder={`Enter ${label.toLowerCase()}`}
                    onChange={handleInputChange}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex gap-4 mt-16"
            variants={itemVariants}
          >
            <motion.button
              type="submit"
              className="btn-primary text-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Save Changes
            </motion.button>
            <motion.button
              type="button"
              onClick={() => router.push('/profile')}
              className="btn-secondary text-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
          </motion.div>
        </form>
      </motion.main>
    </div>
  );
};

export default EditProfile;