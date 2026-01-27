import { SectionHeaderItem } from "./components/SectionHeaderItem/SectionHeaderItem";

import type { JSX } from "react";
import type { SectionHeaderProps } from "./SectionHeader.types";


export const SectionHeader = ({isActive, sections, onClick }: SectionHeaderProps): JSX.Element => {
  return (
    <nav className="w-full flex flex-row gap-4">
      {sections.map((section) => (
        <SectionHeaderItem
          key={section.id}
          id={section.id}
          title={section.title}
          isActive={section.id === isActive}
          onClick={onClick}
        />
      ))}
    </nav>
  );
};
