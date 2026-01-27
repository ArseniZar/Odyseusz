import { type JSX } from "react";
import type { TextareaInputProps } from "./TextareaInput.types";


export const TextareaInput = ({label,placeholder = "", value, error, tooltipText, className = "", classTextareaWrapper = "", classTextarea = "",onChange, onFocus, onBlur}: TextareaInputProps): JSX.Element => {
  const stringValue = value == null ? "" : String(value);

  return (
    <div className={`relative flex flex-col gap-2 group ${className}`}>
      <label className="ml-2 text-lg tracking-wide">{label}</label>

      {tooltipText && (
        <div className="z-20 absolute bottom-full mb-1 py-2 px-3 rounded-2xl bg-white opacity-0 border border-black/10 shadow-xl invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-400">
          <p className="break-normal">{tooltipText}</p>
        </div>
      )}

      <div className={`flex flex-row items-center pr-2 rounded-2xl border-2 border-black/10 shadow-xl focus-within:border-blue-600 ${error ? "border-red-500" : ""} ${classTextareaWrapper}`}>
        <textarea
          className={`min-w-0 min-h-12 flex-1 py-3 px-4 outline-none resize-y ${classTextarea}`}
          placeholder={placeholder}
          value={stringValue}
          onChange={e => onChange?.(e.target.value)}
          onFocus={e => onFocus?.(e)}
          onBlur={e => onBlur?.(e)}
        />
      </div>
      {error && <p className="h-full ml-2 my-auto text-sm text-red-500">{error}</p>}
    </div>
  );
};