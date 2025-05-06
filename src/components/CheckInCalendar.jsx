import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { subDays, format } from "date-fns";
import "react-calendar-heatmap/dist/styles.css";
import { supabase } from "@/services/supabaseClient";

export default function CheckInCalendar() {
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    fetchCalendarData();
  }, []);

  const fetchCalendarData = async () => {
    const { data, error } = await supabase
      .from("daily_logs")
      .select("date, user_id");

    if (error) {
      console.error("❌ Fout bij kalenderdata:", error);
      return;
    }

    const grouped = {};
    for (let entry of data) {
      const date = entry.date;
      const userId = entry.user_id;
      if (!grouped[date]) grouped[date] = new Set();
      grouped[date].add(userId);
    }

    const result = Object.keys(grouped).map((date) => ({
      date,
      count: grouped[date].size,
    }));

    console.log("🔥 Heatmap data:", result);
    setHeatmapData(result);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 text-center">
      <h2 className="text-xl font-bold mb-4">Activiteit laatste 2 weken</h2>
      <CalendarHeatmap
        startDate={subDays(new Date(), 13)}  // 14 dagen inclusief vandaag
        endDate={new Date()}
        values={heatmapData}
        showWeekdayLabels={false} // ✅ Geen Mon/Wed/Fri
        classForValue={(value) => {
          if (!value || value.count === 0) return "color-0";
          if (value.count === 1) return "color-1";
          if (value.count === 2) return "color-2";
          if (value.count === 3) return "color-3";
          if (value.count === 4) return "color-4";
          if (value.count >= 5) return "color-5";
        }}
        tooltipDataAttrs={(value) =>
          value.date
            ? {
                "data-tip": `${value.count} gebruikers op ${value.date}`,
              }
            : { "data-tip": "Geen data" }
        }
        transformDayElement={(el, value) => {
          return React.cloneElement(el, {
            children: value.count > 0 ? (
              <text x="6" y="10" fontSize="8" fill="white">
                {value.count}
              </text>
            ) : null,
          });
        }}
      />
    </div>
  );
}
