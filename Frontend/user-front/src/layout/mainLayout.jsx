import Header from "../component/Header";
import Footer from "../component/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="pt-24">{children}</main>
      <Footer />
    </>
  );
}
