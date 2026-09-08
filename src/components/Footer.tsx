import { Link } from "react-router-dom";
import { company, images, nav } from "../data/content";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="wrap grid gap-12 py-16 md:grid-cols-4">
        <div>
          <img src={images.logo} alt="Belloz Construction" className="mb-4 h-12 w-12 rounded object-cover" />
          <p className="font-display text-[2rem]">Belloz Construction</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/65">
            Custom homes and remodels in {company.region}. Same crew, start to finish.
          </p>
        </div>
        <div>
          <p className="label mb-4 text-gold">Explore</p>
          <nav className="flex flex-col gap-2 text-sm text-white/75">
            <Link to="/" className="hover:text-gold">
              Home
            </Link>
            {nav.map((item) => (
              <Link key={item.to} to={item.to} className="hover:text-gold">
                {item.label}
              </Link>
            ))}
            <Link to="/terms" className="hover:text-gold">
              Terms
            </Link>
          </nav>
        </div>
        <div>
          <p className="label mb-4 text-gold">Contact</p>
          <div className="flex flex-col gap-2 text-sm text-white/75">
            {company.phones.map((p) => (
              <a key={p.name} href={p.href} className="hover:text-gold">
                {p.label}: {p.display}
              </a>
            ))}
            <a href={`mailto:${company.email}`} className="hover:text-gold">
              {company.email}
            </a>
            <p>
              {company.location}
              <br />
              Serving {company.region}
            </p>
          </div>
        </div>
        <div>
          <p className="label mb-4 text-gold">Follow</p>
          <div className="flex flex-col gap-2 text-sm text-white/75">
            {company.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-gold">
                {s.label}
              </a>
            ))}
            <Link to="/#estimate" className="btn btn-gold mt-4 w-fit">
              Get a free estimate
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-white/45">
        © {new Date().getFullYear()} Belloz Construction LLC ·{" "}
        <Link to="/terms" className="text-white/65 hover:text-gold">
          Terms and conditions
        </Link>
      </div>
    </footer>
  );
}