import {type DayPickerProps as DayPickerLabProps } from "react-day-picker";

export type StageDayPickerProps = DayPickerLabProps & {
  label: string;
  className?: string;     
  classInput?: string;    
  tooltipText?: string;
};