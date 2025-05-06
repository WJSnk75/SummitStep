import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!error) {
      navigate('/');
    } else {
      alert(error.message);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Account aanmaken</h1>
      <input
        className="mb-2 w-full p-2 border rounded"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mb-4 w-full p-2 border rounded"
        type="password"
        placeholder="Wachtwoord"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleSignup}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Registreren
      </button>

      <p className="mt-4 text-sm">
  Al een account?{' '}
  <button onClick={() => navigate('/login')} className="text-blue-500 hover:underline">
    Log in
  </button>
</p>


    </div>
  );
}
