import { useState } from "react";
import HeroImage from "./components/HeroImage";
import CalendarGrid from "./components/CalendarGrid";
import NotesSection from "./components/NotesSection";
import { motion } from "framer-motion";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [notes, setNotes] = useState({});
  const [endDate, setEndDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-2 md:p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl overflow-hidden">

        <motion.div
          key = {currentDate}
          initial = {{ rotateY: 90, opacity: 0}}
          animate = {{ rotateY: 0, opacity: 1}}
          transition={{ duration: 0.5}}
          style = {{ transformStyle: "preserve-3d" }}
        >
          <HeroImage currentDate={currentDate} />

          <div className="flex flex-col md:grid md:grid-cols-2">
            <CalendarGrid
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            notes = {notes}
            startDate = {startDate}
            endDate = {endDate}
            setStartDate = {setStartDate}
            setEndDate = {setEndDate}
            setSelectedDate={setSelectedDate}
          />
          <NotesSection 
            notes = {notes}
            setNotes = {setNotes}
            startDate = {startDate}
            endDate = {endDate}
            selectedDate = {selectedDate}
          />
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default App;