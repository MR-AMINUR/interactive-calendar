

import { useState, useEffect } from "react";

function NotesSection({ notes, setNotes, selectedDate }) {
  const [input, setInput] = useState("");
  const [saved, setSaved] = useState(false);

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

  // Load note when date changes only (removed `notes` from deps to prevent refill after save)
  useEffect(() => {
    setSaved(false);
    if (!selectedDate) {
      setInput("");
      return;
    }
    setInput(notes[selectedDate] || "");
  }, [selectedDate]); // 👈 key fix: `notes` removed from here

  return (
    <div className="p-4 md:p-6 border-t md:border-t-0 md:border-l bg-gray-50">
      <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Notes</h2>

      {selectedDate && (
        <p className="text-xs text-gray-400 mb-2">
          📅 {selectedDate}
        </p>
      )}

      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setSaved(false);
        }}
        className="w-full h-40 md:h-48 border rounded-lg p-3 
        focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        placeholder={
          selectedDate
            ? "Write note for selected date..."
            : "Select a date first..."
        }
        disabled={!selectedDate}
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

          setInput(""); // ✅ now works correctly since notes is removed from useEffect deps
          setSaved(true);
          setTimeout(() => setSaved(false), 2000);
        }}
        disabled={!selectedDate || !input.trim()}
        className={`mt-3 w-full py-2 rounded text-white transition-all duration-300
          ${saved
            ? "bg-green-500"
            : !selectedDate || !input.trim()
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
          }`}
      >
        {saved ? "✓ Note Saved!" : "Save Note"}
      </button>

      <p className="text-xs text-gray-400 mt-2 text-center">
        Notes are saved automatically
      </p>
    </div>
  );
}

export default NotesSection;