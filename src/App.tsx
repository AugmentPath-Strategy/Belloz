import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { MobileDock } from "./components/MobileDock";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Homes } from "./pages/Homes";
import { Standard } from "./pages/Standard";
import { Terms } from "./pages/Terms";
import { Work } from "./pages/Work";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/homes" element={<Homes />} />
        <Route path="/standard" element={<Standard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
      <MobileDock />
    </div>
  );
}
