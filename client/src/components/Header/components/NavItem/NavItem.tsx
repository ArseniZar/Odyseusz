import { NavLink } from "react-router-dom";
import type { NavItemProps } from "../types";
import type { JSX } from "react";

export const NavItem =({ to, label, end = false }:NavItemProps):JSX.Element => {
  return (
      <NavLink 
        to={to} 
        end={end}
        className={({ isActive }) => `flex flex-row hover:scale-110 transition-transform duration-300 ${isActive ? "border-b-4 border-white" : "hover:scale-110"}`}
        >
        {label}
      </NavLink>
  );
}
