import React from "react";
import { FaCalendarCheck, FaUsers, FaHandshake, FaStar } from "react-icons/fa";

export default function Stats() {
  const stats = [
    { icon: <FaCalendarCheck className="text-5xl text-secondary mb-4 mx-auto" />, label: "Total Events", value: "125+" },
    { icon: <FaUsers className="text-5xl text-secondary mb-4 mx-auto" />, label: "Total Users", value: "430+" },
    { icon: <FaHandshake className="text-5xl text-secondary mb-4 mx-auto" />, label: "Vendors Partnered", value: "67+" },
    { icon: <FaStar className="text-5xl text-secondary mb-4 mx-auto" />, label: "Average Rating", value: "4.8/5" },
  ];

  return (
    <section className="py-24 bg-text1 dark:bg-bgDark transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary">
          Platform Stats
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-text1 dark:bg-primary rounded-2xl shadow-lg p-8 text-center transition-transform transform hover:-translate-y-3 hover:shadow-2xl border-t-4 border-secondary"
            >
              {stat.icon}
              <h3 className="text-xl font-semibold text-primary mb-2">{stat.label}</h3>
              <p className="text-3xl font-bold text-primery">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
