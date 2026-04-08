import { useState, useEffect } from "react";

function NotesSection({ notes, setNotes, selectedDate }) {
  const [input, setInput] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("calendar-notes");
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("calendar-notes", JSON.stringify(notes));
  }, [notes]);

  // Load note when date changes
  useEffect(() => {
    if (!selectedDate) {
      setInput("");
      return;
    }

    setInput(notes[selectedDate] || "");
  }, [selectedDate, notes]);

  return (
    <div className="p-4 md:p-6 border-t md:border-t-0 md:border-l bg-gray-50">
      <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
        Notes
      </h2>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-40 md:h-48 border rounded-lg p-3 
        focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder={
          selectedDate
            ? "Write note for selected date..."
            : "Select a date first..."
        }
      />

      <button
        onClick={() => {
          if (!selectedDate) {
            alert("Select a date first");
            return;
          }

          setNotes({
            ...notes,
            [selectedDate]: input,
          });

          setInput("");
        }}
        className="mt-3 w-full bg-blue-500 text-white py-2 rounded"
      >
        Save Note
      </button>
    </div>
  );
}

export default NotesSection;