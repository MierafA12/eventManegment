import { useState } from "react";
import MainLayout from "../layout/mainLayout";

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const events = [
    { id: 1, title: "Addis Tech Summit 2025", date: "March 15, 2025", location: "Millennium Hall", category: "tech", image: "/images/tech-conference.jpg" },
    { id: 2, title: "Ethio Music Festival", date: "April 20, 2025", location: "Meskel Square", category: "entertainment", image: "/images/music-festival.jpg" },
    { id: 3, title: "National Health Expo", date: "May 10, 2025", location: "Addis Ababa Exhibition Center", category: "Health", image: "/images/charity-run.jpg" },
    { id: 4, title: "Addis Art & Culture Fair", date: "June 5, 2025", location: "National Museum", category: "Art", image: "/images/art-exhibition.jpg" },
    { id: 5, title: "Ethiopian Sports Awards", date: "July 18, 2025", location: "Addis Ababa Stadium", category: "sports", image: "/images/sports.jpg" },
    { id: 6, title: "Startup Pitch Night", date: "August 22, 2025", location: "Iceaddis Hub", category: "tech", image: "/images/startup.jpg" },
  ];

  const filteredEvents =
    selectedCategory === "all"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  return (
    <MainLayout activePage="/events">

      {/* Events Hero */}
      <section className="pt-32 pb-20 bg-lightBg">
        <div className="container mx-auto px-4">

          <h1 className="text-5xl md:text-6xl font-bold text-center text-primary mb-8">
            Upcoming Events
          </h1>

          <p className="text-center text-xl text-secondary mb-12">
            Discover amazing events happening across Ethiopia
          </p>

          {/* Category Filter */}
          <div className="max-w-md mx-auto mb-16">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-6 py-4 rounded-full border-2 border-secondary bg-bg text-primary font-medium focus:outline-none focus:border-primary transition shadow-md"
            >
              <option value="all">All Categories</option>
              <option value="tech">Technology</option>
              <option value="entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="sports">Sports</option>
              <option value="Art">Art</option>
            </select>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-bg rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-3 duration-300"
                >
                  <div className="h-56 bg-secondary relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute top-4 right-4 bg-primary text-text1 px-4 py-2 rounded-full text-sm font-bold">
                      {event.category.toUpperCase()}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-primary mb-3">
                      {event.title}
                    </h3>

                    <div className="space-y-3 text-secondary">
                      <div className="flex items-center">
                        <i className="fas fa-calendar-alt mr-3 text-primary"></i>
                        <span>{event.date}</span>
                      </div>

                      <div className="flex items-center">
                        <i className="fas fa-map-marker-alt mr-3 text-primary"></i>
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <button className="mt-6 w-full bg-primary text-text1 py-3 rounded-full font-semibold hover:bg-buttonHover transition">
                      View Details
                    </button>

                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-2xl text-secondary">
                  No events found in this category yet.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>
    </MainLayout>
  );
}
