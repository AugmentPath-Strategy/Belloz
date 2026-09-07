import { testimonials } from "../data/content";

function Verified() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-gold" aria-label="Verified" role="img">
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path d="M6.2 10.2 8.7 12.7 13.8 7.4" fill="none" stroke="#102033" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TestimonialWall() {
  return (
    <div className="mt-12 columns-1 gap-4 sm:columns-2 xl:columns-3">
      {testimonials.map((item) => (
        <blockquote key={item.quote} className="card mb-4 break-inside-avoid p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5">
                <cite className="not-italic text-[15px] font-semibold text-navy">{item.name}</cite>
                <Verified />
              </div>
              <p className="text-sm text-stone">{item.handle}</p>
            </div>
            <p className="text-xs text-stone">{item.location}</p>
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-ink">{item.quote}</p>
          <p className="mt-4 text-sm text-stone">{item.project}</p>
        </blockquote>
      ))}
    </div>
  );
}