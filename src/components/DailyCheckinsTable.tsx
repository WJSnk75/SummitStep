import { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";

type CheckinCount = {
  date: string;
  count: number;
};

export default function DailyCheckinsTable() {
  const [data, setData] = useState<CheckinCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCheckins = async () => {
      const { data, error } = await supabase
        .from("daily_logs")
        .select("date, user_id");

      if (error) {
        console.error("Fout bij ophalen check-ins:", error.message);
        setLoading(false);
        return;
      }

      // 🌟 Groepeer op datum en tel unieke users
      const grouped: Record<string, Set<string>> = {};

      for (const row of data) {
        const date = row.date;
        const userId = row.user_id;
        if (!grouped[date]) {
          grouped[date] = new Set();
        }
        grouped[date].add(userId);
      }

      const result: CheckinCount[] = Object.entries(grouped).map(([date, userSet]) => ({
        date,
        count: userSet.size,
      }));

      // Sorteer aflopend
      result.sort((a, b) => (a.date < b.date ? 1 : -1));

      setData(result);
      setLoading(false);
    };

    fetchCheckins();
  }, []);

  if (loading) return <div className="p-4">Laden...</div>;

  return (
    <div className="p-4 w-full overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Aantal unieke check-ins per dag</h2>
      <table className="w-full table-auto border-collapse text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2 text-left">Datum</th>
            <th className="border px-4 py-2 text-left">Check-ins</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.date} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{row.date}</td>
              <td className="border px-4 py-2">{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
