import { useState } from "react";
import { Lightbox } from "../components/Lightbox";
import { company, customHomes } from "../data/content";

export function Homes() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="page-pad">
      <section className="relative min-h-[52vh] overflow-hidden bg-navy text-white">
        <img src={customHomes.homes[2].image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-navy/68" />
        <div className="relative mx-auto flex min-h-[52vh] max-w-7xl items-end px-6 pb-14">
          <div>
            <p className="label text-gold">{company.region}</p>
            <h1 className="mt-3 text-5xl md:text-6xl">{customHomes.title}</h1>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-6 py-16">
        {customHomes.paragraphs.map((p) => (
          <p key={p} className="mb-5 text-lg text-stone">
            {p}
          </p>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-8 md:grid-cols-2">
          {customHomes.homes.map((home) => (
            <button key={home.name} type="button" className="text-left" onClick={() => setOpen(home.image)}>
              <img src={home.image} alt={home.name} className="h-[400px] w-full rounded-3xl object-cover" />
              <h2 className="mt-4 text-3xl text-navy">{home.name}</h2>
            </button>
          ))}
        </div>
      </section>
      {open && <Lightbox src={open} alt="Custom Belloz home" onClose={() => setOpen(null)} />}
    </div>
  );
}
