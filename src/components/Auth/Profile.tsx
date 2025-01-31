import React from "react";
import { FaUserCircle } from "react-icons/fa"; // User icon from react-icons
import { useAuth } from "../../context/AuthContext";


const Profile: React.FC = () => {
  const {user} = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Profile</h1>
      {user ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            {/* User Icon */}
            <div className="mb-4">
              <FaUserCircle className="text-6xl text-blue-600" />
            </div>

            {/* User Info */}
            <div className="mb-4 text-center">
              <h2 className="text-xl font-semibold text-gray-800">{"User"}</h2>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>

            {/* Additional User Info (Optional) */}
            <div className="mb-4 text-center">
              <p className="text-sm text-gray-600">Phone: N/A</p>
            </div>

            {/* Logout Button */}
            
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default Profile;
