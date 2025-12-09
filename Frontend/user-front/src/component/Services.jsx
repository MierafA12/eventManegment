export default function Services() {
  const services = [
    {
      icon: "fa-calendar-check",
      title: "Event Planning",
      description:
        "We specialize in comprehensive event planning services tailored to your vision and budget...",
    },
    {
      icon: "fa-paint-brush",
      title: "Venue Design & Decoration",
      description:
        "Our creative design team transforms spaces into stunning environments...",
    },
    {
      icon: "fa-headset",
      title: "On-Site Coordination",
      description:
        "Our professional coordinators ensure everything runs according to plan...",
    },
  ];

  return (
    <section className="py-20 bg-lightBg">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-bg p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition"
            >
              <div className="text-5xl text-primary mb-4">
                <i className={`fas ${service.icon}`}></i>
              </div>

              <h3 className="text-2xl font-bold text-primary mb-4">
                {service.title}
              </h3>

              <p className="text-secondary leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
