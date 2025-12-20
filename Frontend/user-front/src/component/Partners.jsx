export default function Partners() {
  const partners = [
    "/images/amanevent.png",
    "/images/paarmaevent.png",
    "/images/flowevent.jpg",
    "/images/kanda.jpg",
    "/images/ind.jpg",
  ];

  return (
    <section className="py-20 bg-lightBg dark:bg-bgDark transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary dark:text-secondary">
          Our Partners
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 items-center opacity-70">
          {partners.map((img, i) => (
            <img key={i} src={img} alt="Partner" className="mx-auto" />
          ))}
        </div>
      </div>
    </section>
  );
}
