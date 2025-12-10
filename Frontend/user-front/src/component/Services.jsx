import React from "react";
import { FaCalendarCheck, FaPaintBrush, FaHeadset } from "react-icons/fa";

export default function Services() {
  const services = [
    {
      icon: <FaCalendarCheck className="text-5xl text-secondary mb-5 mx-auto" />,
      title: "Event Planning",
      description:
        "We specialize in comprehensive event planning services tailored to your vision and budget. From concept to execution, we handle every detail, ensuring a stress-free experience.",
    },
    {
      icon: <FaPaintBrush className="text-5xl text-secondary mb-5 mx-auto" />,
      title: "Venue Design & Decoration",
      description:
        "Our creative team transforms spaces into stunning environments using lighting, floral arrangements, props, and decor to match your theme perfectly.",
    },
    {
      icon: <FaHeadset className="text-5xl text-secondary mb-5 mx-auto" />,
      title: "On-Site Coordination",
      description:
        "Professional coordinators ensure everything runs smoothly, manage vendors, handle last-minute changes, and guarantee flawless execution.",
    },
  ];

  return (
    <section className="py-24 bg-lightBg">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-8 text-center transition-transform transform hover:-translate-y-3 hover:shadow-2xl border-t-4 border-secondary"
            >
              {service.icon}
              <h3 className="text-2xl font-semibold text-primary mb-4">
                {service.title}
              </h3>
              <p className="text-primery leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
