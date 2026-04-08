import { useState } from "react";
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

function CalendarGrid({ currentDate, setCurrentDate }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
          onClick={() =>
            setCurrentDate(
              new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - 1
              )
            )
          }
          className="px-3 py-1 bg-gray-200 rounded hover:bg-blue-500 hover:text-white transition"
        >
          ←
        </button>

        <h2 className="text-xl font-bold">
          {format(currentDate, "MMMM yyyy")}
        </h2>

        <button
          onClick={() =>
            setCurrentDate(
              new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1
              )
            )
          }
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

      {/* Dates */}
      <div className="grid grid-cols-7 gap-2 transition-all duration-300">
        {/* Empty spaces */}
        {Array.from({ length: (startDay === 0 ? 6 : startDay - 1) }).map(
          (_, i) => (
            <div key={"empty-" + i}></div>
          )
        )}

        {/* Actual dates */}
        {daysInMonth.map((date) => {
          const isStart = startDate && isSameDay(date, startDate);
          const isEnd = endDate && isSameDay(date, endDate);
          const isInRange =
            startDate &&
            endDate &&
            isAfter(date, startDate) &&
            isBefore(date, endDate);

          const dayIndex = getDay(date);
          const isWeekend = dayIndex === 0 || dayIndex === 6;

          return (
            <div
              key={date}
              onClick={() => handleDateClick(date)}
              className={`h-10 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200

              ${isStart || isEnd ? "bg-blue-600 text-white scale-105 shadow-md" : ""}
              ${isInRange ? "bg-blue-200" : ""}
              ${isWeekend ? "text-red-400" : ""}

              hover:bg-blue-100 hover:scale-105
              `}
            >
              {format(date, "d")}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarGrid;