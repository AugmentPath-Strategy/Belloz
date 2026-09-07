import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Lightbox } from "../components/Lightbox";
import { PageHero } from "../components/PageHero";
import { builtBy, reservedImages, services } from "../data/content";
import { workImages } from "../data/workImages";

export function Work() {
  const location = useLocation();
  const [active, setActive] = useState("gallery");
  const [open, setOpen] = useState<string | null>(null);
  const gallery = useMemo(() => workImages.filter((src) => !reservedImages.has(src)), []);

  function goTo(id: string) {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) requestAnimationFrame(() => goTo(hash));
  }, [location.hash]);

  return (
    <div className="page-pad">
      <PageHero kicker={builtBy.subtitle} title={builtBy.title} text={builtBy.galleries} />

      <section className="sticky top-[72px] z-30 border-b border-black/5 bg-[#f7f4ef]/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <p className="label mb-3 text-stone">Jump to a service</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => goTo("gallery")}
              className={`rounded-full px-4 py-2 text-sm transition ${active === "gallery" ? "bg-navy text-white" : "bg-white text-navy hover:bg-mist"}`}
            >
              All work
            </button>
            {services.map((s) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => goTo(s.slug)}
                className={`rounded-full px-4 py-2 text-sm transition ${active === s.slug ? "bg-navy text-white" : "bg-white text-navy hover:bg-mist"}`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((s) => (
            <article key={s.slug} id={s.slug} className="scroll-mt-52 overflow-hidden rounded-3xl bg-white md:scroll-mt-60">
              <button type="button" className="group block w-full text-left" onClick={() => setOpen(s.image)}>
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={s.image} alt={s.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" loading="lazy" decoding="async" />
                </div>
                <div className="p-6">
                  <h2 className="text-3xl text-navy">{s.name}</h2>
                  <p className="mt-3 text-stone">{s.text}</p>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="gallery" className="scroll-mt-52 bg-cream px-6 py-16 md:scroll-mt-60">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl text-navy">Project photography</h2>
          <p className="mt-3 max-w-2xl text-stone">
            These images are from the Belloz Construction galleries: kitchens, baths, site work, and finishes across Central Texas.
          </p>
          <div className="mt-8 columns-2 gap-3 md:columns-3 lg:columns-4">
            {gallery.map((src, i) => (
              <button key={src} type="button" className="mb-3 block w-full overflow-hidden rounded-2xl" onClick={() => setOpen(src)}>
                <img src={src} alt={`Belloz Construction project photo ${i + 1}`} className="w-full object-cover" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {open && <Lightbox src={open} alt="Belloz Construction project" onClose={() => setOpen(null)} />}
    </div>
  );
}
