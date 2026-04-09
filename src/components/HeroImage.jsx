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
    <div className="relative h-40 md:h-72 overflow-hidden rounded-t-2xl">

      {/* Skeleton shown while image loads */}
      <div className="absolute inset-0 bg-gray-300 animate-pulse" />

      {/* Hero image with fade-in on load */}
      <img
        src={`${image}?auto=format&fit=crop&w=1200&q=80`}
        alt={format(currentDate, "MMMM yyyy")}
        loading="lazy"
        className="w-full h-full object-cover opacity-0 transition-opacity duration-700 relative z-10"
        onLoad={(e) => {
          e.target.classList.remove("opacity-0");
          e.target.classList.add("opacity-100");
        }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50 z-20 flex flex-col items-center justify-center gap-1">
        <h2 className="text-white text-2xl md:text-4xl font-bold tracking-wide drop-shadow-lg">
          {format(currentDate, "MMMM")}
        </h2>
        <p className="text-white/80 text-sm md:text-lg tracking-widest drop-shadow">
          {format(currentDate, "yyyy")}
        </p>
      </div>

    </div>
  );
}

export default HeroImage;