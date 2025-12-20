export default function Hero() {
  return (
    <header
      className="bg-gradient-to-br from-primary to-secondary text-text1 pt-24 pb-32 bg-cover bg-center "
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')" // place your image in public folder
      }}
    >
      <div className="container mx-auto text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Crafting Events That Matter
        </h1>
        <p className="text-xl md:text-2xl opacity-90">
          Experience the extraordinary with Ethio Events
        </p>
      </div>
    </header>
  );
}
