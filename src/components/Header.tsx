import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { images, nav } from "../data/content";
import { CallMenu } from "./CallMenu";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f7f4ef]/95 backdrop-blur-md">
      <div className="wrap flex h-[72px] items-center justify-between gap-3">
        <Link to="/" className="flex shrink-0 items-center gap-2 sm:gap-3" onClick={() => setOpen(false)}>
          <img src={images.logo} alt="Belloz Construction" className="h-11 w-11 shrink-0 rounded object-cover" />
          <span className="shrink-0 leading-none">
            <span className="block font-display text-[1.5rem] text-navy sm:text-[1.65rem]">Belloz</span>
            <span className="mt-1 block whitespace-nowrap text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-stone">
              Construction
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
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

        <div className="flex shrink-0 items-center gap-3">
          <CallMenu className="hidden lg:block" />
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M5 8h14M5 12h14M5 16h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-[#f7f4ef] px-6 py-5 lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} className="text-lg text-navy">
                {item.label}
              </NavLink>
            ))}
            <Link to="/#estimate" onClick={() => setOpen(false)} className="btn btn-navy mt-2">
              Get a free estimate
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}