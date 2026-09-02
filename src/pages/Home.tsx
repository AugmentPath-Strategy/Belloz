import { Link } from "react-router-dom";
import { builtBy, company, customHomes, homeHomes, images, services, story, testimonials, values } from "../data/content";

export function Home() {
  const phone = company.phones[0];
  const featuredServices = services.slice(0, 6);

  return (
    <div className="page-pad">
      <section className="relative min-h-[100svh] overflow-hidden bg-navy text-white">
        <img
          src={images.hero}
          alt="The Twin Oaks Farmhouse, built by Belloz Construction"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(16,32,51,0.92)_0%,rgba(16,32,51,0.72)_46%,rgba(16,32,51,0.28)_100%)]" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-20 pt-28 md:justify-center md:pb-28">
          <p className="label text-gold">Foundation to finish · {company.region}</p>
          <h1 className="mt-5 max-w-3xl text-5xl md:text-7xl">
            Built by Belloz.
            <br />
            Crafted to the standard.
          </h1>
          <p className="mt-7 max-w-xl text-lg text-white/80">{builtBy.intro}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-gold">
              Send a message
            </Link>
            <Link to="/work" className="btn btn-line text-white">
              See the work
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-black/5 bg-cream">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-2">
          <a href={phone.href} className="text-navy transition hover:text-gold-deep">
            <span className="label text-gold-deep">Call or text</span>
            <span className="mt-1 block font-display text-3xl md:text-4xl">{phone.display}</span>
          </a>
          <a href={`mailto:${company.email}`} className="text-navy transition hover:text-gold-deep md:text-right">
            <span className="label text-gold-deep">Email</span>
            <span className="mt-1 block font-display text-2xl md:text-4xl">{company.email}</span>
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="label text-gold-deep">What we build</p>
            <h2 className="mt-3 text-4xl text-navy md:text-5xl">From kitchens to custom homes</h2>
            <p className="mt-4 text-stone">{builtBy.galleries}</p>
          </div>
          <Link to="/work" className="hidden text-sm font-semibold text-navy underline decoration-gold underline-offset-4 md:block">
            See all work
          </Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((s, i) => (
            <Link
              key={s.slug}
              to={`/work#${s.slug}`}
              className={`group overflow-hidden rounded-3xl shadow-[0_1px_0_rgba(16,32,51,0.04)] transition hover:-translate-y-0.5 ${
                i === 1 || i === 4 ? "bg-navy text-white" : "bg-white"
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={s.image} alt={s.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="p-6">
                <h3 className="text-3xl">{s.name}</h3>
                <p className={`mt-3 text-[15px] ${i === 1 || i === 4 ? "text-white/70" : "text-stone"}`}>{s.text}</p>
                <span className={`mt-6 inline-block text-sm font-semibold ${i === 1 || i === 4 ? "text-gold" : "text-navy"}`}>
                  View details
                </span>
              </div>
            </Link>
          ))}
        </div>
        <Link to="/work" className="mt-10 block text-center text-sm font-semibold text-navy underline decoration-gold underline-offset-4 md:hidden">
          See all work
        </Link>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
          <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="grid h-[28rem] grid-cols-2 grid-rows-[7.25rem_minmax(0,1fr)] gap-3 sm:h-[36rem] sm:grid-rows-[8rem_minmax(0,1fr)] lg:h-full lg:min-h-[38rem]">
              <img
                src={images.aboutKitchen}
                alt="Kitchen built by Belloz Construction"
                className="h-full w-full rounded-3xl object-cover [grid-area:1/1/3/2]"
              />
              <div className="flex h-full flex-col justify-center rounded-3xl bg-navy px-5 py-4 text-white [grid-area:1/2/2/3]">
                <p className="font-display text-5xl leading-none">15+</p>
                <p className="mt-2 text-sm text-white/70">Years in the industry</p>
              </div>
              <img
                src={images.aboutBuild}
                alt="Home framing by Belloz Construction"
                className="h-full w-full rounded-3xl object-cover [grid-area:2/2/3/3]"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="label text-gold-deep">{story.eyebrow}</p>
              <h2 className="mt-3 text-4xl text-navy md:text-5xl">Perfection is not a luxury. It is the standard.</h2>
              <div className="mt-6 space-y-4 text-stone">
                {story.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <Link to="/standard" className="btn btn-navy mt-8 w-fit">
                Read our story
              </Link>
            </div>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {values.map((v, i) => (
              <div key={v.title} className={`rounded-3xl p-6 ${i === 0 ? "bg-navy text-white" : "bg-white"}`}>
                <h3 className="text-2xl">{v.title}</h3>
                <p className={`mt-3 text-sm ${i === 0 ? "text-white/70" : "text-stone"}`}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <div className="flex items-end justify-between">
          <div className="max-w-2xl">
            <p className="label text-gold-deep">Featured homes</p>
            <h2 className="mt-3 text-4xl text-navy md:text-5xl">Custom built homes</h2>
            <p className="mt-4 text-stone">{customHomes.paragraphs[0]}</p>
          </div>
          <Link to="/homes" className="hidden text-sm font-semibold text-navy underline decoration-gold underline-offset-4 md:block">
            View all homes
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {homeHomes.map((home) => (
            <Link key={home.name} to="/homes" className="group">
              <div className="overflow-hidden rounded-3xl">
                <img src={home.image} alt={home.name} className="h-80 w-full object-cover transition duration-500 group-hover:scale-[1.03] md:h-[26rem]" />
              </div>
              <p className="mt-3 text-2xl text-navy">{home.name}</p>
            </Link>
          ))}
        </div>
        <Link to="/homes" className="mt-8 block text-center text-sm font-semibold text-navy underline decoration-gold underline-offset-4 md:hidden">
          View all homes
        </Link>
      </section>

      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:py-28">
          <div>
            <p className="label text-gold">From foundation to finish</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Every trade, one standard</h2>
            <p className="mt-5 text-white/70">{builtBy.intro}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-[15px] text-white/80">
            {services.map((s) => (
              <Link key={s.slug} to={`/work#${s.slug}`} className="hover:text-gold">
                {s.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl gap-4 px-6 pb-24 md:grid-cols-3 md:pb-28">
          <img src={images.bandOne} alt="Finish work by Belloz Construction" className="h-72 w-full rounded-3xl object-cover md:h-96" />
          <img src={images.bandTwo} alt="Framing crew by Belloz Construction" className="h-72 w-full rounded-3xl object-cover md:h-96" />
          <img src={images.bandThree} alt="Tile work by Belloz Construction" className="h-72 w-full rounded-3xl object-cover md:h-96" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 md:py-28">
        <p className="label text-gold-deep">What our clients say</p>
        <h2 className="mt-3 text-4xl text-navy md:text-5xl">In their words</h2>
        <div className="mt-12 space-y-5">
          {testimonials.map((quote) => (
            <blockquote key={quote} className="rounded-3xl bg-white p-8 text-lg text-stone shadow-[0_1px_0_rgba(16,32,51,0.04)]">
              "{quote}"
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 md:pb-28">
        <div className="rounded-3xl bg-gold px-8 py-14 text-navy md:flex md:items-center md:justify-between md:px-14">
          <div>
            <h2 className="text-4xl md:text-5xl">Ready to talk through a project?</h2>
            <p className="mt-4 max-w-xl text-navy/75">{story.closer}</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 md:mt-0">
            <a href={phone.href} className="btn btn-navy">
              Call {phone.display}
            </a>
            <Link to="/contact" className="btn bg-white text-navy">
              Email the team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
