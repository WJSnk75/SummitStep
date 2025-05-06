import React from 'react';
import CheckInButton from '../components/CheckInButton';
import { useAuth } from '../services/AuthContext';

export default function Home() {
  const { session } = useAuth();
  const user = session?.user;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Je moet ingelogd zijn om SummitStep te gebruiken.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Welkom bij SummitStep, {user.email.split('@')[0]} 👋
      </h1>
      <p className="mb-6 text-gray-700 text-center">
        Check dagelijks in om samen te trainen richting de top van de Kilimanjaro 🏔️
      </p>
      <CheckInButton user={user} />
    </div>
  );
}
