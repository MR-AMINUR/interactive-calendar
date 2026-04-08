

import { useState, useEffect } from "react";

function NotesSection({ notes, setNotes, startDate, endDate }) {
  const [input, setInput] = useState("");

  // Load notes
  useEffect(() => {
    const savedNotes = localStorage.getItem("calendar-notes");
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Save notes
  useEffect(() => {
    localStorage.setItem("calendar-notes", notes);
  }, [notes]);

  const key =
  startDate
    ? startDate.toISOString().split("T")[0]
    : "default";
  
  return (
    <div className="p-4 md:p-6 border-t md:border-t-0 md:border-l bg-gray-50">
      
      <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
        Notes
      </h2>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-40 md:h-48 border rounded-lg p-3 text-sm md:text-base 
        focus:outline-none focus:ring-2 focus:ring-blue-400 
        bg-white resize-none transition"
        placeholder="Write your notes..."
      />

      <button 
        onClick={() =>
          setNotes({
            ...notes,
            [key]: input,
          })
        }
        className="mt-3 w-full bg-blue-500 text-while py-2 rounded hover:bg-blue-600 transition"  
      >
        Save Note
      </button>

      {/* Small UX improvement */}
      <p className="text-xs text-gray-400 mt-2">
        Notes are saved automatically
      </p>
    </div>
  );
}

export default NotesSection;