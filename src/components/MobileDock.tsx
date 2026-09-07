import { Link } from "react-router-dom";
import { company } from "../data/content";

export function MobileDock() {
  const phone = company.phones[0];
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/5 bg-[#f7f4ef]/95 px-3 py-2.5 backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <a href={phone.href} className="btn btn-navy py-3 text-sm">
          Call now
        </a>
        <Link to="/#estimate" className="btn btn-gold py-3 text-sm">
          Get a free estimate
        </Link>
      </div>
    </div>
  );
}