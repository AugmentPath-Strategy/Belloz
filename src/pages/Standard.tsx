import { PageHero } from "../components/PageHero";
import { founder, images, story, testimonials, values } from "../data/content";

export function Standard() {
  return (
    <div className="page-pad">
      <PageHero kicker="The Belloz Standard" title={story.eyebrow} />

      <section className="mx-auto grid max-w-7xl items-start gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <img src={founder.photo} alt={founder.name} className="w-full rounded-3xl object-cover" />
          <p className="mt-5 text-3xl text-navy">{founder.name}</p>
          <p className="text-stone">{founder.title}</p>
        </div>
        <div>
          {story.paragraphs.map((p) => (
            <p key={p} className="mb-6 text-lg text-stone">
              {p}
            </p>
          ))}
          <p className="text-2xl text-navy">
            {founder.signOff}, {founder.title}
          </p>
        </div>
      </section>

      <section className="bg-cream px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl text-navy md:text-5xl">Our values</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <div key={v.title} className={`rounded-3xl p-8 ${i === 0 ? "bg-navy text-white" : "bg-white"}`}>
                <h3 className="text-3xl">{v.title}</h3>
                <p className={`mt-3 ${i === 0 ? "text-white/70" : "text-stone"}`}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-4xl text-navy md:text-5xl">What our clients say</h2>
        <div className="mt-10 space-y-4">
          {testimonials.map((item) => (
            <blockquote key={item.quote} className="rounded-3xl bg-white p-7 text-lg text-stone">
              "{item.quote}"
              <footer className="mt-4 text-sm text-navy">
                {item.name} · {item.project}
              </footer>
            </blockquote>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-2xl text-navy">{story.closer}</p>
        <img src={images.standardWork} alt="Bathroom finish by Belloz Construction" className="mt-10 h-80 w-full rounded-3xl object-cover" loading="lazy" decoding="async" />
      </section>
    </div>
  );
}
