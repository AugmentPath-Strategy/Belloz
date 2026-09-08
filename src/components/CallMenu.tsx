import { company } from "../data/content";

type CallMenuProps = {
  variant?: "gold" | "navy" | "line" | "line-light";
  align?: "left" | "right";
  drop?: "up" | "down";
  className?: string;
  label?: string;
};

export function CallMenu({
  variant = "gold",
  align = "right",
  drop = "down",
  className = "",
  label = "Call",
}: CallMenuProps) {
  const variantClass =
    variant === "navy"
      ? "btn-navy"
      : variant === "line"
        ? "btn-line text-navy"
        : variant === "line-light"
          ? "btn-line btn-line-light text-white"
          : "btn-gold";

  return (
    <details className={`relative ${className}`}>
      <summary
        className={`btn ${variantClass} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}
      >
        {label}
      </summary>
      <div
        className={`absolute z-50 min-w-[15.5rem] overflow-hidden rounded-2xl bg-white py-1 shadow-lg ring-1 ring-black/10 ${
          align === "right" ? "right-0" : "left-0"
        } ${drop === "up" ? "bottom-full mb-2" : "mt-2"}`}
      >
        {company.phones.map((p) => (
          <a key={p.name} href={p.href} className="block px-4 py-3 hover:bg-cream">
            <span className="block text-sm font-semibold text-navy">{p.label}</span>
            <span className="mt-0.5 block text-xs text-stone">{p.display}</span>
          </a>
        ))}
      </div>
    </details>
  );
}
