import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../contexts/AuthContext'; // correct pad!

export default function CheckInButton() {
  const { user } = useAuth();
  const [checkedIn, setCheckedIn] = useState(false);

  if (!user) return null;

  const handleCheckIn = async () => {
    const today = new Date().toISOString().split('T')[0];
    const { error } = await supabase.from('daily_logs').insert({
      user_id: user.id,
      date: today,
      status: 'completed'
    });

    if (!error) {
      setCheckedIn(true);
    } else {
      alert('Check-in mislukt: ' + (error.message || 'onbekende fout'));
    }
  };

  return (
    <button
      onClick={handleCheckIn}
      disabled={checkedIn}
      className="bg-green-500 text-white px-4 py-2 rounded"
    >
      {checkedIn ? '✅ Ingecheckt' : 'Check in'}
    </button>
  );
}
