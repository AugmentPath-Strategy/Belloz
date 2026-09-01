import { Link } from "react-router-dom";
import { company, images, nav, services } from "../data/content";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div>
          <img src={images.logo} alt="" className="mb-4 h-12 w-12 rounded object-cover" />
          <p className="font-display text-[2rem]">Belloz Construction</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/65">
            Custom homes and remodeling from foundation to finish across {company.region}.
          </p>
        </div>
        <div>
          <p className="label mb-4 text-gold">Explore</p>
          <div className="flex flex-col gap-2 text-sm text-white/75">
            {nav.map((item) => (
              <Link key={item.to} to={item.to} className="hover:text-gold">
                {item.label}
              </Link>
            ))}
            <Link to="/terms" className="hover:text-gold">
              Terms
            </Link>
          </div>
        </div>
        <div>
          <p className="label mb-4 text-gold">Services</p>
          <div className="flex flex-col gap-2 text-sm text-white/75">
            {services.slice(0, 6).map((s) => (
              <Link key={s.slug} to={`/work#${s.slug}`} className="hover:text-gold">
                {s.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="label mb-4 text-gold">Talk with us</p>
          <div className="flex flex-col gap-2 text-sm text-white/75">
            {company.phones.map((p) => (
              <a key={p.display} href={p.href} className="hover:text-gold">
                {p.label}: {p.display}
              </a>
            ))}
            <a href={`mailto:${company.email}`} className="hover:text-gold">
              {company.email}
            </a>
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
