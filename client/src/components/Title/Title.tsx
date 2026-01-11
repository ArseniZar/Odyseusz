import type { TitleSectionProps as TitleProps } from "./Title.types";

export const Title = ({ title, className }: TitleProps) => (
  <h2 className={`text-3xl  ${className}`}>{title}</h2>
  
);
