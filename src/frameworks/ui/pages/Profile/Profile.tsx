import React from 'react';
import { useAuthStore } from '../../stores/useAuthStore';

export const Profile: React.FC = () => {
  const { isAuthenticated, profile } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>

        <div className="space-y-4">
          <div className="flex items-center border-b pb-4">
            <span className="text-gray-600 font-medium w-32">Username:</span>
            <span className="text-gray-800">{profile?.username}</span>
          </div>

          <div className="flex items-center">
            <span className="text-gray-600 font-medium w-32">Email:</span>
            <span className="text-gray-800">{profile?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
