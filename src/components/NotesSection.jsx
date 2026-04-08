// import { useState, useEffect } from "react";

// function NotesSection() {
//   const [notes, setNotes] = useState("");

//   // Load notes when component loads
//   useEffect(() => {
//     const savedNotes = localStorage.getItem("calendar-notes");
//     if (savedNotes) {
//       setNotes(savedNotes);
//     }
//   }, []);

//   // Save notes whenever changed
//   useEffect(() => {
//     localStorage.setItem("calendar-notes", notes);
//   }, [notes]);

//   return (
//     <div className="p-6 border-t md:border-t-0 md:border-l">
//       <h2 className="text-xl font-bold mb-4">Notes</h2>

//       <textarea
//         value={notes}
//         onChange={(e) => setNotes(e.target.value)}
//         className="w-full h-48 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         placeholder="Write your notes..."
//       />
//     </div>
//   );
// }

// export default NotesSection;

import { useState, useEffect } from "react";

function NotesSection() {
  const [notes, setNotes] = useState("");

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

  return (
    <div className="p-4 md:p-6 border-t md:border-t-0 md:border-l bg-gray-50">
      
      <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
        Notes
      </h2>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full h-40 md:h-48 border rounded-lg p-3 text-sm md:text-base 
        focus:outline-none focus:ring-2 focus:ring-blue-400 
        bg-white resize-none transition"
        placeholder="Write your notes..."
      />

      {/* Small UX improvement */}
      <p className="text-xs text-gray-400 mt-2">
        Notes are saved automatically
      </p>
    </div>
  );
}

export default NotesSection;