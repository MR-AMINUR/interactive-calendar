import { useState } from "react";
import { motion } from "framer-motion";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameDay,
  isAfter,
  isBefore,
} from "date-fns";

function CalendarGrid({
  currentDate,
  setCurrentDate,
  notes,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  setSelectedDate,
}) {
  const [direction, setDirection] = useState(1);

  const holidays = {
    "2026-01-01": "New Year",
    "2026-01-14": "Makar Sankranti",
    "2026-01-26": "Republic Day",
    "2026-03-08": "Holi",
    "2026-04-14": "Ambedkar Jayanti",
    "2026-08-15": "Independence Day",
    "2026-08-19": "Raksha Bandhan",
    "2026-10-02": "Gandhi Jayanti",
    "2026-10-20": "Diwali",
    "2026-12-25": "Christmas",
  };

  const handleDateClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (isBefore(date, startDate)) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    setSelectedDate(format(date, "yyyy-MM-dd"));
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = getDay(monthStart);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="p-6">

      {/* Navigation */}
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => {
            setDirection(-1);
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
            );
          }}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-blue-500 hover:text-white transition"
        >
          ←
        </button>

        <h2 className="text-xl font-bold">
          {format(currentDate, "MMMM yyyy")}
        </h2>

        <button
          onClick={() => {
            setDirection(1);
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
            );
          }}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-blue-500 hover:text-white transition"
        >
          →
        </button>
      </div>

      {/* Range hint */}
      <p className="text-xs text-center text-gray-400 mb-3 h-4">
        {startDate && !endDate
          ? "✅ Now click an end date to complete range"
          : startDate && endDate
          ? `📅 ${format(startDate, "MMM d")} → ${format(endDate, "MMM d")}`
          : "Click any date to select"}
      </p>

      {/* Day headers */}
      <div className="grid grid-cols-7 text-center text-sm font-semibold mb-2 text-gray-500">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar grid with animation */}
      <div style={{ perspective: "1000px" }}>
        <motion.div
          key={currentDate.toISOString()}
          className="grid grid-cols-7 gap-2"
          initial={{
            rotateY: direction === 1 ? 90 : -90,
            opacity: 0,
          }}
          animate={{
            rotateY: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.45,
          }}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Empty leading cells */}
          {Array.from({ length: startDay === 0 ? 6 : startDay - 1 }).map(
            (_, i) => (
              <div key={"empty-" + i}></div>
            )
          )}

          {/* Date cells */}
          {daysInMonth.map((date) => {
            const dateKey = format(date, "yyyy-MM-dd");
            const note = notes[dateKey];
            const holiday = holidays[dateKey];

            const isStart = startDate && isSameDay(date, startDate);
            const isEnd = endDate && isSameDay(date, endDate);
            const isInRange =
              startDate &&
              endDate &&
              isAfter(date, startDate) &&
              isBefore(date, endDate);

            const dayIndex = getDay(date);
            const isWeekend = dayIndex === 0 || dayIndex === 6;
            const isToday = isSameDay(date, new Date());

            return (
              <div
                key={dateKey}
                onClick={() => handleDateClick(date)}
                title={holiday || ""}
                className={`
                  relative h-12 flex flex-col items-center justify-center
                  text-sm rounded-lg cursor-pointer transition-all duration-200

                  ${isStart || isEnd
                    ? "bg-blue-600 text-white scale-105 shadow-md"
                    : ""}
                  ${isInRange ? "bg-blue-100" : ""}
                  ${holiday
                    ? "bg-red-100 text-red-600 font-semibold"
                    : isWeekend && !isStart && !isEnd
                    ? "text-red-400"
                    : ""}
                  ${isToday && !isStart && !isEnd
                    ? "border-2 border-blue-500"
                    : ""}
                  hover:bg-blue-50 hover:scale-105
                `}
              >
                <span>{format(date, "d")}</span>

                {/* Holiday label */}
                {holiday && (
                  <span className="text-[8px] leading-tight truncate w-full text-center px-0.5">
                    {holiday}
                  </span>
                )}

                {/* Note dot */}
                {note && (
                  <span className="absolute bottom-0.5 w-1.5 h-1.5 bg-blue-500 rounded-full ring-2 ring-white"></span>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export default CalendarGrid;