import type { Props as SelectLibProps } from "react-select";
export interface SelectProps<T> extends SelectLibProps<Option<T>, true> {
  label: string;
  tooltipText?: string;
  className?: string;
  classSelect?: string;
}

export interface Option<T> {
  value: T;
  label: string;
}
