import type { JSX } from "react";
import Logo from "./components/Logo/Logo";
import NavItem from "./components/NavItem/NavItem";

import {iconAccount, iconMaps} from "@/assets/";
const navItems = [
  { title: "Home", href: "/" },

  { title: "Zarejestruj podróż", href: "/traveler/add_trip" },
  { title: "Archiwum podróży", href: "/traveler/read_all_trip" },
  { title: "Edytuj podróż", href: "/traveler/edit_trip/1" },

  { title: "Dodaj ewakuację", href: "/kordinator/add_evacuation" }, //!!
  { title: "Archiwum ewakuacji", href: "/kordinator/all_evacuation" , }, //!!
  { title: "Edytuj ewakuację", href: "/kordinator/edit_evacuation/1" },

  // { title: "Dodaj ewakuację", href: "/kordinator/add_evacuation" }, //!!
  { title: "Archiwum profili kraju", href: "/editor/all_profile" , }, //!!
  { title: "Edytuj profil kraju", href: "/editor/edit_profile/1" },
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
          {navItems.map((items, index) => (<NavItem key={index} title={items.title} href={items.href} />))}
        </ul>
        <ul className="flex felx-row sm:gap-4 lg:gap-8">
          {navItemsRight.map((items, index) => (<NavItem key={index} title={items.title} href={items.href} src={items.src}/>))}
        </ul>
      </nav>
    </header>
  );
}
