import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { EstimateForm } from "../components/EstimateForm";
import { TestimonialWall } from "../components/TestimonialWall";
import {
  company,
  customHomes,
  founder,
  images,
  serviceAreas,
  services,
  story,
  values,
} from "../data/content";

export function Home() {
  const phone = company.phones[0];
  const featuredServices = services.slice(0, 6);
  const recentProjects = customHomes.homes.slice(0, 4);
  const location = useLocation();

  useEffect(() => {
    const id = location.hash.replace("#", "");
    if (!id) return;
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }, [location.hash]);

  return (
    <div className="page-pad">
      <section className="relative min-h-[100svh] overflow-hidden bg-navy text-white">
        <img
          src={images.hero}
          alt="The Enclave Gate Modern, a custom home built by Belloz Construction"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(16,32,51,0.78)_0%,rgba(16,32,51,0.42)_52%,rgba(16,32,51,0.12)_100%)]" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-20 pt-28 md:justify-center md:pb-28">
          <p className="label text-gold">Foundation to finish in {company.region}</p>
          <h1 className="mt-5 max-w-3xl text-5xl md:text-7xl">Custom homes and remodels built to last.</h1>
          <p className="mt-7 max-w-xl text-lg text-white/80">
            Same crew from the pour to the last coat of paint. Tell us about your project and we can meet on site for an estimate.
          </p>
          <a href={phone.href} className="mt-6 inline-block font-display text-3xl text-gold hover:text-white md:text-4xl">
            {phone.display}
          </a>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#estimate" className="btn btn-gold">
              Get a free estimate
            </a>
            <a href={phone.href} className="btn btn-line btn-line-light text-white">
              Call now
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-black/5 bg-cream">
        <div className="wrap grid gap-8 py-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-4xl text-navy">15+</p>
            <p className="mt-1 text-sm text-stone">Years in the trades</p>
          </div>
          <div>
            <p className="font-display text-4xl text-navy">One team</p>
            <p className="mt-1 text-sm text-stone">Foundation to finish</p>
          </div>
          <div>
            <p className="font-display text-4xl text-navy">{company.region}</p>
            <p className="mt-1 text-sm text-stone">Austin and nearby cities</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="label text-gold-deep">Recent projects</p>
              <h2 className="mt-3 text-4xl text-navy md:text-5xl">Houses we have built</h2>
              <p className="mt-4 text-stone">{customHomes.paragraphs[0]}</p>
            </div>
            <Link to="/homes" className="hidden text-sm font-semibold text-navy underline decoration-gold underline-offset-4 md:block">
              View all homes
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {recentProjects.map((home) => (
              <Link key={home.name} to="/homes" className="group">
                <div className="overflow-hidden rounded-3xl">
                  <img
                    src={home.image}
                    alt={home.name}
                    className="h-80 w-full object-cover transition duration-500 group-hover:scale-[1.03] md:h-[26rem]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="mt-3 text-2xl text-navy">{home.name}</p>
              </Link>
            ))}
          </div>
          <Link to="/work" className="mt-8 block text-center text-sm font-semibold text-navy underline decoration-gold underline-offset-4">
            See more job photos
          </Link>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="wrap">
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="label text-gold-deep">Services</p>
              <h2 className="mt-3 text-4xl text-navy md:text-5xl">What we do</h2>
              <p className="mt-4 text-stone">Kitchens, baths, new homes, and the trades in between. We stay on the job.</p>
            </div>
            <Link to="/work" className="hidden text-sm font-semibold text-navy underline decoration-gold underline-offset-4 md:block">
              All services
            </Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((s) => (
              <Link key={s.slug} to={`/work#${s.slug}`} className="card group transition hover:-translate-y-0.5">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-3xl text-navy">{s.name}</h3>
                  <p className="mt-3 text-[15px] text-stone">{s.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="label text-gold-deep">About the owner</p>
          <h2 className="mt-3 max-w-3xl text-4xl text-navy md:text-5xl">We do not cut corners. That is the point.</h2>
          <p className="mt-4 text-xl text-navy">
            {founder.name}, {founder.title}
          </p>
          <div className="mt-6 max-w-3xl space-y-4 text-stone">
            {story.paragraphs.slice(0, 2).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <Link to="/standard" className="btn btn-navy mt-8">
            Read our story
          </Link>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v) => (
              <div key={v.title} className="rounded-3xl bg-cream p-5">
                <h3 className="text-2xl text-navy">{v.title}</h3>
                <p className="mt-2 text-sm text-stone">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="wrap">
          <p className="label text-gold-deep">Service area</p>
          <h2 className="mt-3 text-4xl text-navy md:text-5xl">Where we work</h2>
          <p className="mt-4 max-w-2xl text-stone">
            We are in {company.location}. We take jobs around {company.region}.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {serviceAreas.map((city) => (
              <li key={city} className="rounded-3xl bg-white px-5 py-4 text-navy">
                {city}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="label text-gold-deep">Reviews</p>
          <h2 className="mt-3 text-4xl text-navy md:text-5xl">What clients say</h2>
          <TestimonialWall />
        </div>
      </section>

      <section id="estimate" className="section scroll-mt-28 bg-cream">
        <div className="wrap grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="label text-gold-deep">Free estimate</p>
            <h2 className="mt-3 text-4xl text-navy md:text-5xl">Tell us about the job</h2>
            <p className="mt-4 text-stone">Call, text, or use the form. We will call you back.</p>
            <a href={phone.href} className="mt-8 block font-display text-4xl text-navy hover:text-gold-deep">
              {phone.display}
            </a>
            <a href={`mailto:${company.email}`} className="mt-3 block text-stone hover:text-navy">
              {company.email}
            </a>
            <img
              src={images.aboutKitchen}
              alt="Kitchen built by Belloz Construction"
              className="mt-10 h-72 w-full rounded-3xl object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <EstimateForm />
        </div>
      </section>
    </div>
  );
}
