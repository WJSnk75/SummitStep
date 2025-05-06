import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) navigate('/');
    else alert(error.message);
  };

  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
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
      <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded">
        Inloggen
      </button>


      <p className="mt-4 text-sm">
  Nog geen account?{' '}
  <button onClick={() => navigate('/signup')} className="text-blue-500 hover:underline">
    Registreer hier
  </button>
</p>
      
    </div>
    
  );
}
