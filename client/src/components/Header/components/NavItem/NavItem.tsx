import { Link } from "react-router-dom";
import type { NavItemProps } from "../types";

export default function NavItem({ title, href, src}: NavItemProps) {
  return (
    <li className="hover:scale-110 transition-transform duration-300">
      <Link to={href} className="flex flex-row gap-3 items-center">
        {title}
       {src && <img src={src} className="h-6 w-6" />}
      </Link>
    </li>
  );
}
