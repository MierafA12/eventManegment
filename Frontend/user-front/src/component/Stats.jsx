export default function Stats() {
  const stats = [
    { icon: "fa-calendar-check", label: "Total Events", value: "125+" },
    { icon: "fa-users", label: "Total Users", value: "430+" },
    { icon: "fa-handshake", label: "Vendors Partnered", value: "67+" },
    { icon: "fa-star", label: "Average Rating", value: "4.8/5" },
  ];

  return (
    <section className="py-20 bg-bg">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">
          Platform Stats
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-5xl text-primary mb-4">
                <i className={`fas ${stat.icon}`}></i>
              </div>

              <h3 className="text-xl font-semibold text-primary">
                {stat.label}
              </h3>

              <p className="text-3xl font-bold text-secondary mt-2">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
