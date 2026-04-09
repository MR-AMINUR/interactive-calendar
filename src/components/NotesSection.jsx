import { useState, useEffect } from "react";
import { format } from "date-fns";

function NotesSection({ notes, setNotes, selectedDate }) {
  const [input, setInput] = useState("");
  const [saved, setSaved] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("calendar-notes");
    if (stored) {
      setNotes(JSON.parse(stored));
    }
  }, []);

  // Persist to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("calendar-notes", JSON.stringify(notes));
  }, [notes]);

  // Load note when selected date changes
  // `notes` intentionally excluded from deps to prevent
  // textarea refilling immediately after saving
  useEffect(() => {
    setSaved(false);
    if (!selectedDate) {
      setInput("");
      return;
    }
    setInput(notes[selectedDate] || "");
  }, [selectedDate]);

  const handleSave = () => {
    if (!selectedDate) return;
    setNotes({ ...notes, [selectedDate]: input });
    setInput("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = () => {
    if (!selectedDate) return;
    const updated = { ...notes };
    delete updated[selectedDate];
    setNotes(updated);
    setInput("");
    setSaved(false);
  };

  const formatDisplay = (dateStr) => {
    try {
      const [year, month, day] = dateStr.split("-").map(Number);
      return format(new Date(year, month - 1, day), "EEEE, MMM d yyyy");
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="p-4 md:p-6 border-t md:border-t-0 md:border-l bg-gray-50 flex flex-col">

      <h2 className="text-lg md:text-xl font-bold mb-1">Notes</h2>

      {/* Selected date display */}
      <p className="text-xs text-blue-500 font-medium mb-3 h-4">
        {selectedDate ? `📅 ${formatDisplay(selectedDate)}` : "No date selected"}
      </p>

      {/* Textarea */}
      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setSaved(false);
        }}
        disabled={!selectedDate}
        className="w-full flex-1 min-h-40 md:min-h-48 border rounded-lg p-3
          focus:outline-none focus:ring-2 focus:ring-blue-400
          disabled:bg-gray-100 disabled:cursor-not-allowed
          resize-none transition-all duration-200"
        placeholder={
          selectedDate
            ? "Write a note for this date..."
            : "Select a date first..."
        }
      />

      {/* Character count */}
        <p className="text-xs text-gray-400 text-right mt-1">
          {input.length} characters
        </p>

        {/* Saved note display */}
        {selectedDate && notes[selectedDate] && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg animate-fade">
            <div className="flex justify-between items-center mb-1">
              <p className="text-xs font-semibold text-blue-600">📌 Saved Note</p>
              <span className="text-xs text-gray-400">{formatDisplay(selectedDate)}</span>
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{notes[selectedDate]}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2 mt-2">
        <button
          onClick={handleSave}
          disabled={!selectedDate || !input.trim()}
          className={`flex-1 py-2 rounded text-white font-medium transition-all duration-300
            ${saved
              ? "bg-green-500"
              : !selectedDate || !input.trim()
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          {saved ? "✓ Saved!" : "Save Note"}
        </button>

        <button
          onClick={handleDelete}
          disabled={!selectedDate || !notes[selectedDate]}
          title="Delete note"
          className="px-4 py-2 rounded bg-red-100 text-red-500
            hover:bg-red-500 hover:text-white transition-all duration-300
            disabled:opacity-30 disabled:cursor-not-allowed"
        >
          🗑
        </button>
      </div>

      <p className="text-xs text-gray-400 mt-2 text-center">
        Click Save Note to attach to selected date
      </p>

    </div>
  );
}

export default NotesSection;