import type { JSX } from "react";
import type { InputProps } from "./Input.types";

//prettier-ignore
export const Input = ({type = "text", label, placeholder ="", value, tooltipText, className ="", classInput ="", ref = null, onChange, onFocus, onBlur}: InputProps): JSX.Element => {
  return (
    <div className={`relative flex flex-col gap-2 group ${className}`}>
      <label className="ml-2 text-lg tracking-wide">{label}</label>
       {tooltipText && (
        <div className="z-20 absolute bottom-full  mb-1 py-2 px-3 rounded-2xl bg-white opacity-0 border border-black/10  shadow-xl invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-400">
          <p className="break-normal">{tooltipText}</p>
        </div>
      )}
      <input
        className={`py-2 px-3 rounded-2xl border-2 border-black/10 shadow-xl ${classInput}`}
        placeholder={placeholder}
        value={value}
        type={type}
        ref={ref} 
        onChange={(e) => onChange && onChange(e.target.value)}
        onFocus={(e) => onFocus && onFocus(e)}
        onBlur={(e) => onBlur && onBlur(e)}
      />
    </div>
  );
};

