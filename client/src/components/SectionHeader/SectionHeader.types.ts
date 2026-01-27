import type { SectionHeaderItemProps } from "./components/SectionHeaderItem/SectionHeaderItem.types";

export interface SectionHeaderProps {
    sections:  Pick<SectionHeaderItemProps, "id" | "title">[];
    isActive: string;
    onClick: (id: string) => void;

}