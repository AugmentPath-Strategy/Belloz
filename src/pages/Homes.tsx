import { useState } from "react";
import { Lightbox } from "../components/Lightbox";
import { PageHero } from "../components/PageHero";
import { customHomes } from "../data/content";

export function Homes() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="page-pad">
      <PageHero kicker={customHomes.title} title="Homes built with precision and purpose." text={customHomes.paragraphs[0]} />
      <section className="mx-auto max-w-3xl px-6 py-16">
        {customHomes.paragraphs.slice(1).map((p) => (
          <p key={p} className="mb-5 text-lg text-stone">
            {p}
          </p>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-8 md:grid-cols-2">
          {customHomes.homes.map((home) => (
            <button key={home.name} type="button" className="group text-left" onClick={() => setOpen(home.image)}>
              <div className="overflow-hidden rounded-3xl">
                <img src={home.image} alt={home.name} className="h-[360px] w-full object-cover transition duration-500 group-hover:scale-[1.03] md:h-[420px]" loading="lazy" decoding="async" />
              </div>
              <h2 className="mt-4 text-3xl text-navy">{home.name}</h2>
            </button>
          ))}
        </div>
      </section>
      {open && <Lightbox src={open} alt="Custom Belloz home" onClose={() => setOpen(null)} />}
    </div>
  );
}
