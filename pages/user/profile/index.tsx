import Layout from '@/components/layouts';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { API_URL } from "@/config/config";

interface Profile {
  avatar?: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get('token');
      if (!token) return;
      
      const res = await fetch(`${API_URL}/api/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        setProfile(data?.data || null);
      }
    };

    fetchProfile();
  }, []);

  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };


  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        {profile ? (
          <div className="flex flex-col items-center text-center">
             <div className="w-24 h-24 flex items-center justify-center bg-gray-300 text-gray-700 text-4xl font-bold rounded-full">
              {getInitials(profile.name)}
            </div>
            <h1 className="text-2xl font-semibold mt-4">{profile.name}</h1>
            <p className="text-gray-600">{profile.email}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Edit Profile
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading profile...</p>
        )}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <p className="text-gray-700 mt-2">Phone: {profile?.phone || 'N/A'}</p>
          <p className="text-gray-700">Address: {profile?.address || 'N/A'}</p>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;