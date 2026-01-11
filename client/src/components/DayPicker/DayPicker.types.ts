import {type DayPickerProps as DayPickerLabProps } from "react-day-picker";

export type DayPickerProps = DayPickerLabProps & {
  label: string;
  className?: string;     
  classInput?: string;    
  tooltipText?: string;
};