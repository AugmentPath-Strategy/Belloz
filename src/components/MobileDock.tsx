import { Link } from "react-router-dom";

export function MobileDock() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/5 bg-[#f7f4ef]/95 px-3 py-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="grid items-stretch gap-2">
        <Link
          to="/#estimate"
          className="btn btn-gold h-12 w-full min-w-0 px-2 text-sm whitespace-nowrap"
        >
          Free estimate
        </Link>
      </div>
    </div>
  );
}
