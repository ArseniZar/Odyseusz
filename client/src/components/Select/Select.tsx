import type { JSX } from "react";
import SelectLib from "react-select";

import makeAnimated from "react-select/animated";
import type { SelectProps, Option } from "./Select.types";



export const Select = <T,>({label,tooltipText,className,classSelect, ...props}: SelectProps<T>): JSX.Element => {
  return (
    <div className={`relative flex flex-col gap-2 group ${className}`}>
      <label className="ml-2 text-lg tracking-wide">{label}</label>
      {tooltipText && (
        <div className="z-20 absolute bottom-full  mb-1 py-2 px-3 rounded-2xl bg-white opacity-0 border border-black/10  shadow-xl invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-400">
          <p className="break-normal">{tooltipText}</p>
        </div>
      )}
      <SelectLib<Option<T>, true>
        unstyled
        placeholder={props.placeholder ?? ""}
        classNames={{
          control: () => {
            return `py-3 px-4 rounded-2xl border-2 border-black/10 shadow-xl ${classSelect}`;
          },
          placeholder: () => "opacity-50",

          valueContainer: () => "flex flex-wrap gap-3",

          multiValue: () => "px-2 rounded-xl gap-3 bg-black",
          multiValueLabel: () => "text-white",
          multiValueRemove: () => "my-auto rounded-full bg-white",

          menu: () => "mt-1 py-3 px-4 rounded-2xl border border-black/10 bg-white overflow-hidden shadow-xl z-10",
          menuList: () => "ml-2 max-h-40 overflow-auto", 
          clearIndicator: ()=> "rounded-full border border-black/10 shadow-xl p-[3px]"
        }}
        isMulti
        closeMenuOnSelect={false}
        components={makeAnimated()}
        options={props.options}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};
