import { useState } from "react";
import HeroImage from "./components/HeroImage";
import CalendarGrid from "./components/CalendarGrid";
import NotesSection from "./components/NotesSection";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-2 md:p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl overflow-hidden">

        <HeroImage currentDate={currentDate} />

        <div className="flex flex-col md:grid md:grid-cols-2">
          <CalendarGrid
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
          <NotesSection />
        </div>

      </div>
    </div>
  );
}

export default App;