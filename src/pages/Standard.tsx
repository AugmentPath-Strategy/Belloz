import { PageHero } from "../components/PageHero";
import { TestimonialWall } from "../components/TestimonialWall";
import { founder, images, story, values } from "../data/content";

export function Standard() {
  return (
    <div className="page-pad">
      <PageHero kicker="The Belloz Standard" title={story.eyebrow} />

      <section className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-3xl text-navy">{founder.name}</p>
        <p className="text-stone">{founder.title}</p>
        {story.paragraphs.map((p) => (
          <p key={p} className="mt-6 text-lg text-stone">
            {p}
          </p>
        ))}
        <p className="mt-8 text-2xl text-navy">
          {founder.signOff}, {founder.title}
        </p>
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
        <TestimonialWall />
        <p className="mt-10 max-w-2xl text-2xl text-navy">{story.closer}</p>
        <img src={images.standardWork} alt="Bathroom finish by Belloz Construction" className="mt-10 h-80 w-full rounded-3xl object-cover" loading="lazy" decoding="async" />
      </section>
    </div>
  );
}
