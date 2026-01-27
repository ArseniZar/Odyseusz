import type { JSX } from "react";
import type { SectionHeaderItemProps } from "./SectionHeaderItem.types";
import { Title } from "@/components/Title";

export const SectionHeaderItem = ({ id, title, isActive, onClick }: SectionHeaderItemProps): JSX.Element => {
    return (
        <button
            onClick={() => onClick?.(id)}
            className={`pb-2 transition-transform ${
            isActive
                ? "border-b-2 border-black/50"
                : "hover:scale-105"
            }`}
        >
            <Title className="font-light" title={title} />
        </button>
    );
};