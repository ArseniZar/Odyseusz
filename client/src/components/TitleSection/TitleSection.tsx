import type { TitleSectionProps } from "./TitleSection.type";

export const TitleSection = ({ title, className }: TitleSectionProps) => (
  <h2 className={`text-3xl font-light ${className}`}>{title}</h2>
  
);
