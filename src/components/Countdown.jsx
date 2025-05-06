import { useEffect, useState } from "react";

const Countdown = () => {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const targetDate = new Date("2025-07-22T00:00:00");
    const updateCountdown = () => {
      const today = new Date();
      const diffTime = targetDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysLeft(diffDays);
    };

    updateCountdown(); // meteen bij laden
    const interval = setInterval(updateCountdown, 86400000); // dagelijks bijwerken

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-yellow-100 text-yellow-900 text-center py-2 text-sm font-semibold shadow">
      ⛰️ Nog {daysLeft} dagen tot de Kilimanjaro-trip!
    </div>
  );
};

export default Countdown;
