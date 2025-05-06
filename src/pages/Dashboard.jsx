import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/services/supabaseClient";
import CheckInButton from "@/components/CheckInButton";
import DailyCheckinsTable from "@/components/DailyCheckinsTable";
import TopCheckinUsers from "@/components/TopCheckinUsers";

export default function Dashboard() {
  const { user } = useAuth();
  const [streak, setStreak] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [checkInsToday, setCheckInsToday] = useState(0);

  useEffect(() => {
    if (user) {
      fetchPersonalStats();
      fetchGlobalStats();
      
    }
  }, [user]);

  const fetchPersonalStats = async () => {
    const { data, error } = await supabase
      .from("daily_logs")
      .select("date")
      .eq("user_id", user.id);

    if (error) {
      console.error("❌ Fout bij persoonlijke stats:", error);
      return;
    }

    const dates = data.map((d) => d.date).filter(Boolean);
    const uniqueDates = [...new Set(dates)].sort().reverse();
    setTotalDays(uniqueDates.length);

    let count = 0;
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < uniqueDates.length; i++) {
      const d = parseDate(uniqueDates[i]);
      d.setHours(0, 0, 0, 0);

      if (i === 0 && isSameDay(d, today)) {
        count++;
      } else {
        today.setDate(today.getDate() - 1);
        if (isSameDay(d, today)) {
          count++;
        } else {
          break;
        }
      }
    }

    setStreak(count);
  };

  const fetchGlobalStats = async () => {
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("daily_logs")
      .select("user_id, date")
      .eq("date", today);

    if (error) {
      console.error("❌ Fout bij globale stats:", error);
      return;
    }

    const uniqueUserIds = [...new Set(data.map((d) => d.user_id))];
    setCheckInsToday(uniqueUserIds.length);
  };

  const parseDate = (str) => {
    const [y, m, d] = str.split("-");
    return new Date(+y, +m - 1, +d);
  };

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Welkom bij SummitStep, {user.email.split("@")[0]} 👋
      </h1>
      <p className="mb-6 text-gray-700 text-center">
        Check dagelijks in om samen te trainen richting de top van de Kilimanjaro 🏔️
      </p>

      <CheckInButton
        onCheckIn={() => {
          fetchPersonalStats();
          fetchGlobalStats();
        }}
      />

      <div className="mt-8 w-full max-w-sm space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2">Jouw statistieken</h2>
          <p>🔥 Streak: {streak} dagen</p>
          <p>📆 Totaal ingecheckt: {totalDays} dagen</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2">Vandaag</h2>
          <p>✅ {checkInsToday} gebruikers hebben vandaag ingecheckt</p>
        </div>
      </div>


      <div className="mt-6"> 
      <TopCheckinUsers />
      </div>

      <div className="mt-12 w-full max-w-3xl text-center">
        <DailyCheckinsTable />
      </div>
    </div>
  );
}
