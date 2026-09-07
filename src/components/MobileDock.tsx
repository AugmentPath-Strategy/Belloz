import { Link } from "react-router-dom";
import { CallMenu } from "./CallMenu";

export function MobileDock() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/5 bg-[#f7f4ef]/95 px-3 py-2.5 backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <CallMenu variant="navy" align="left" drop="up" className="w-full [&>summary]:w-full [&>summary]:py-3 [&>summary]:text-sm" />
        <Link to="/#estimate" className="btn btn-gold py-3 text-sm">
          Get a free estimate
        </Link>
      </div>
    </div>
  );
}
