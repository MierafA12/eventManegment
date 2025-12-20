// src/pages/About.jsx
import MainLayout from "../layout/mainLayout";

export default function About() {
  const teamMembers = [
    { name: "Melat", title: "Event Director & Chief Organizer", email: "melat@Ethioevents.com" },
    { name: "Mieraf Abebe", title: "Event Operations Manager", email: "mieraf@Ethioevents.com" },
    { name: "Bethel Zewdu", title: "Event Marketing Specialist", email: "bethel@Ethioevents.com" },
    { name: "Lidiya Shenkut", title: "Technical Event Coordinator", email: "lidiya@Ethioevents.com" },
    { name: "Tsedeniya Yeshibelay", title: "Event Decor & Venue Manager", email: "tsedeniya@Ethioevents.com" },
    { name: "Betelhem Mulugeta", title: "Guest Experience Lead", email: "betelhem@Ethioevents.com" },
  ];

  const galleryItems = [
    { img: "/images/tech-conference.jpg", title: "Event Planning" },
    { img: "/images/music-festival.jpg", title: "Catering & Services" },
    { img: "/images/charity-run.jpg", title: "Stage & Venue Setup" },
    { img: "/images/art-exhibition.jpg", title: "Entertainment & Programs" },
  ];

  return (
    <MainLayout>

      {/* About Section */}
      <section className="pb-20 bg-lightBg dark:bg-bgDark transition-colors duration-300">
        <div className="container mx-auto px-4 text-center pt-10">
          <h1 className="text-5xl md:text-6xl font-bold text-primary dark:text-text1 mb-8">About Ethio Events</h1>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-6 text-primary dark:text-text1 text-lg">
              <p>Welcome to <strong className="text-primary dark:text-secondary">Ethio Events</strong>, Ethiopia’s premier event management platform.</p>
              <p>Our platform connects <strong>event organizers and participants</strong> seamlessly. Event organizers can post their events, manage registrations, and engage with attendees easily.</p>
              <p>Participants can browse events, register instantly, and keep track of their tickets in one place.</p>
              <p>With multiple admins and organizers, our platform ensures that every event is handled professionally, efficiently, and transparently.</p>
              <p className="text-xl font-semibold text-primary dark:text-secondary">Our mission: simplify event management and create memorable experiences for everyone.</p>
            </div>

            {/* Gallery */}
            <div className="grid grid-cols-2 gap-4">
              {galleryItems.map((item, i) => (
                <div key={i} className="relative group overflow-hidden rounded-xl shadow-lg">
                  <img src={item.img} alt={item.title} className="w-full h-64 object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                    <h3 className="text-white font-bold">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-lightBg dark:bg-bgDark transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary dark:text-text1">Meet Our Team</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="bg-bg dark:bg-bgDark rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
                <div className="h-64">
                  <img src="/images/profilee.jpg" alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-primary dark:text-text1">{member.name}</h3>
                  <p className="text-primary dark:text-secondary font-medium mt-2">{member.title}</p>
                  <p className="mt-4 text-primary/80 dark:text-text1/80 text-sm">{member.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </MainLayout>
  );
}
