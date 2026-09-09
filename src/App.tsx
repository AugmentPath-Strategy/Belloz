import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ChatLead } from "./components/ChatLead";
import { MobileDock } from "./components/MobileDock";
import { Seo } from "./seo/Seo";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Homes } from "./pages/Homes";
import { Standard } from "./pages/Standard";
import { Terms } from "./pages/Terms";
import { Work } from "./pages/Work";

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      <Seo pathname={location.pathname} />
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
      <ChatLead />
      <MobileDock />
    </div>
  );
}
