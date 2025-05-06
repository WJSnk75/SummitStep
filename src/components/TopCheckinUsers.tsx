import { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";

export default function TopCheckinUsers() {
  const [users, setUsers] = useState<
    { user_id: string; name: string | null; count: number }[]
  >([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      const { data, error } = await supabase.rpc("get_top_checkin_users");
      if (error) {
        console.error("❌ Fout bij ophalen top gebruikers:", error.message);
        return;
      }
      setUsers(data);
    };

    fetchTopUsers();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-semibold mb-2">🏆 Top 3 meest ingecheckt</h2>
      <ul className="text-left text-sm mt-2">
        {users.map((user, index) => (
          <li key={user.user_id}>
            #{index + 1} – {user.name || "Onbekend"} • {user.count} dagen
          </li>
        ))}
      </ul>
    </div>
  );
}
