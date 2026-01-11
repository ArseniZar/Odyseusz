import type { TitleSectionProps } from "./TitleSection.types";

export const TitleSection = ({ title, className }: TitleSectionProps) => (
  <h2 className={`text-3xl font-light ${className}`}>{title}</h2>
  
);
