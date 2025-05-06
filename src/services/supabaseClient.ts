import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://auygvyawumfbhatprfif.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1eWd2eWF3dW1mYmhhdHByZmlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MzEzNjgsImV4cCI6MjA2MTAwNzM2OH0.XC3OuRGU4odqxs-BQg1tqrmIH3Brf5bn2cVhxfgTaEM'; // verkort voor veiligheid

export const supabase = createClient(supabaseUrl, supabaseKey); // ✅ named export
