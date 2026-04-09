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
  const [activeNote, setActiveNote] = useState(null);
  const [direction, setDirection] = useState(1);

  // Holidays (you can expand this)
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

  // Handle date click
  const handleDateClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (isBefore(date, startDate)) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  });

  const startDay = getDay(monthStart);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="p-6">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => {
            setDirection(-1);
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
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
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
          }}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-blue-500 hover:text-white transition"
        >
          →
        </button>
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 text-center text-sm font-semibold mb-2 text-gray-500">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div style={{ perspective: "1000px" }}>
      <motion.div
        key={currentDate}
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
          duration: 0.5,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
    {/* Empty spaces */}
    {Array.from({ length: startDay === 0 ? 6 : startDay - 1 }).map(
      (_, i) => (
        <div key={"empty-" + i}></div>
      )
    )}

    {/* Actual dates */}
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

      const today = new Date();
      const isToday = isSameDay(date, today);

      return (
        <div
          key={date}
          onClick={() => {
            handleDateClick(date);
            setSelectedDate(format(date, "yyyy-MM-dd"));

            if (note) {
              setActiveNote({
                text: note,
                date: dateKey,
              });
            } else {
              setActiveNote(null);
            }
          }}
          className={`relative h-12 md:h-10 flex flex-col items-center justify-center text-sm rounded-lg cursor-pointer transition-all duration-200
          
          ${isStart || isEnd ? "bg-blue-600 text-white scale-105 shadow-md" : ""}
          ${isInRange ? "bg-blue-200" : ""}
          ${isWeekend ? "text-red-400" : ""}
          ${holiday ? "bg-red-200 text-red-600 font-semibold" : ""}
          ${isToday ? "border-2 border-blue-500" : ""}

          hover:bg-blue-100 hover:scale-105
          `}
        >
          {format(date, "d")}

          {/* Note dot */}
          {note && (
            <span className="absolute bottom-1 w-2 h-2 bg-blue-600 rounded-full"></span>
          )}

          {/* Holiday label */}
          {holiday && (
            <span className="text-[9px] mt-1">{holiday}</span>
          )}
        </div>
      );
    })}
  </motion.div>
</div>

      {/* 🔥 Note Popup */}
      {activeNote && (
        <div className="mt-4 p-3 bg-white border rounded-lg shadow-md text-sm animate-fade">
          <p className="font-semibold">Note:</p>
          <p>{activeNote.text}</p>
        </div>
      )}
    </div>
  );
}

export default CalendarGrid;