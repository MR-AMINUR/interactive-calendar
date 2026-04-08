

import { format } from "date-fns";

function HeroImage({ currentDate }) {
  const month = currentDate.getMonth();

  const monthImages = {
    0: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
    1: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    2: "https://images.unsplash.com/photo-1490750967868-88aa4486c946",
    3: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    4: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6",
    5: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    6: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    7: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    8: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    9: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    10: "https://images.unsplash.com/photo-1482192505345-5655af888cc4",
    11: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be",
  };

  const image = monthImages[month];

  return (
    <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
      
      {/* Image */}
      <img
        src={image}
        alt="month"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <h2 className="text-white text-xl md:text-3xl font-bold">
          {format(currentDate, "MMMM yyyy")}
        </h2>
      </div>

    </div>
  );
}

export default HeroImage;