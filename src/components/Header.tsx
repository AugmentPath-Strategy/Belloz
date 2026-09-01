import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { company, images, nav } from "../data/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const phone = company.phones[0];

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-navy text-[13px] text-white/75 md:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <a href={phone.href} className="hover:text-gold">
              {phone.display}
            </a>
            <a href={`mailto:${company.email}`} className="hover:text-gold">
              {company.email}
            </a>
          </div>
          <div className="flex items-center gap-5">
            {company.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-gold">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b border-black/5 bg-[#f7f4ef]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img src={images.logo} alt="Belloz Construction" className="h-11 w-11 rounded object-cover" />
            <span className="leading-none">
              <span className="block font-display text-[1.65rem] text-navy">Belloz</span>
              <span className="label mt-1 block text-stone">Construction</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative pb-1 text-[15px] ${
                    isActive
                      ? "text-navy after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gold"
                      : "text-stone hover:text-navy"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href={phone.href} className="btn btn-gold hidden md:inline-flex">
              Call now
            </a>
            <button
              className="rounded-full border border-navy/15 px-4 py-2 text-sm text-navy lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
            >
              Menu
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-black/5 bg-[#f7f4ef] px-6 py-5 lg:hidden">
            <div className="flex flex-col gap-4">
              {nav.map((item) => (
                <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} className="text-lg text-navy">
                  {item.label}
                </NavLink>
              ))}
              <a href={phone.href} className="btn btn-gold mt-2">
                Call {phone.display}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
