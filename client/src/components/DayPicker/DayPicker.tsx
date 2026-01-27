import type { JSX } from "react";
import { DayPicker as DayPickerLib  } from "react-day-picker";
import type { DayPickerProps } from "./DayPicker.types";
import "react-day-picker/dist/style.css";


//prettier-ignore
export const DayPicker = ({ label,className, classInput, tooltipText, error, ...props }: DayPickerProps): JSX.Element => {
  return (
    <div className={`relative flex flex-col gap-2 group ${className}`}>
      <label className="ml-2 text-lg  tracking-wide">{label}</label>
      {tooltipText && (
        <div className="z-20 absolute bottom-full mb-1 py-2 px-3 rounded-2xl border border-black/10 bg-white opacity-0 shadow-xl invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-400">
          <p className="break-normal">{tooltipText}</p>
        </div>
      )}
      <DayPickerLib 
        {...props}
        className={`py-2 px-3 rounded-2xl border-2 border-black/10 shadow-2xl ${error ? "border-red-500" : ""} ${classInput}`}
      />
      {error && <p className="h-full ml-2 my-auto text-sm text-red-500">{error}</p>}
    </div>
  );
};
