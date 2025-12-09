// src/App.jsx
import MainLayout from "../layout/mainLayout";
import Hero from "../component/Hero";
import Services from "../component/Services";
import Stats from "../component/Stats";
import Partners from "../component/Partners";

function App() {
  return (
    <MainLayout activePage="/">
      <Hero />
      <Services />
      <Stats />
      <Partners />
    </MainLayout>
  );
}

export default App;
