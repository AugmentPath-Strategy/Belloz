import { company } from "../data/content";

export function MobileDock() {
  const phone = company.phones[0];
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/5 bg-[#f7f4ef]/95 px-3 py-2.5 backdrop-blur md:hidden">
      <div className="grid grid-cols-3 gap-2">
        <a href={phone.href} className="btn btn-navy py-3 text-sm">
          Call
        </a>
        <a href={phone.sms} className="btn btn-gold py-3 text-sm">
          Text
        </a>
        <a href={`mailto:${company.email}`} className="btn btn-line border-navy/20 py-3 text-sm text-navy">
          Email
        </a>
      </div>
    </div>
  );
}
