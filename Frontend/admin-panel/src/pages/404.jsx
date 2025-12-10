

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-lightBg px-4">
      <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
      <p className="text-2xl text-primary mb-6">Oops! Page not found.</p>
      <a
        href="/"
        className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-buttonHover transition"
      >
        Go Home
      </a>
    </div>
  );
}

