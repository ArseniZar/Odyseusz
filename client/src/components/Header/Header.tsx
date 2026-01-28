import type { JSX } from "react";
import Logo from "./components/Logo/Logo";
import { NavItem } from "./components/NavItem/NavItem";
import {iconAccount, iconMaps} from "@/assets/";
import { routesConfig } from "@/types/rotes";
const navItems = [
  { title: "Home", href: "/" },

  { title: "Zarejestruj podróż", href: routesConfig.TRIP_CREATE.path },
  { title: "Archiwum podróży", href:  routesConfig.TRIPS_READ.path },

  { title: "Dodaj ewakuację", href: routesConfig.EVACUATION_CREATE.path }, 
  { title: "Archiwum ewakuacji", href: routesConfig.EVACUATIONS_READ.path },

  { title: "Archiwum profili kraju", href: routesConfig.PROFILE_COUNTRY_READ.path , },
  { title: "Edytuj profil kraju", href: routesConfig.PROFILE_COUNTRY_EDIT.path.replace(":profileId", "1") },
];

const navItemsRight = [
  { title: "Moje konto", href: "/konto", src: iconAccount  },
];


export const Header = (): JSX.Element => {
  return (
    <header className="py-5 px-10 bg-(--header-bg-color)">
      <nav className="flex flex-row sm:gap-2 lg:gap-5 justify-between items-center  text-lg font-geologica font-medium text-(--header-text-color)">
        <Logo src={iconMaps} />
        <ul className="flex-1 flex flex-row sm:gap-4 lg:gap-8">
          {navItems.map((items, index) => (<NavItem key={index} label={items.title} to={items.href} />))}
        </ul>
        <ul className="flex felx-row sm:gap-4 lg:gap-8">
          {navItemsRight.map((items, index) => (<NavItem key={index} label={items.title} to={items.href}/>))}
        </ul>
      </nav>
    </header>
  );
}
