import {type JSX } from "react";
import type { InputProps } from "./Input.types";
import { IconButton } from "@/components/IconButton";
import {iconCross} from "@/assets/"
//prettier-ignore
export const Input = ({type = "text", label, placeholder ="", value, tooltipText, className ="", classInput ="", ref = null, onChange, onFocus, onBlur}: InputProps): JSX.Element => {
  const stringValue = value == null ? "" : String(value);
  return (
    <div className={`relative flex flex-col gap-2 group ${className}`}>
      <label className="ml-2 text-lg tracking-wide">{label}</label>
       {tooltipText && (
        <div className="z-20 absolute bottom-full  mb-1 py-2 px-3 rounded-2xl bg-white opacity-0 border border-black/10  shadow-xl invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-400">
          <p className="break-normal">{tooltipText}</p>
        </div>
      )}
      <div className={`flex flex-row items-center pr-2 rounded-2xl border-2 border-black/10 shadow-xl focus-within:border-blue-600 ${classInput}`}>
      <input
        className={` min-w-0 flex-1 py-3 px-4 outline-none`}
        placeholder={placeholder}
        value={stringValue}
        type={type}
        ref={ref} 
        onChange={e => {onChange?.(e.target.value)}}
        onFocus={(e) => onFocus?.(e)}
        onBlur={(e) => onBlur?.(e)}
      />
       <IconButton
          icon={iconCross}
          classIcon="w-5 h-5 p-0.5"
          classButton={`p-1 rounded-full  transition-opacity  ${stringValue.length > 0 ? "visible" : "invisible"}`}
          onClick={() => onChange?.("")}
        />
      </div>
    </div>
  );
};

