import { useState, type JSX } from "react";
import type { AreaFormProps } from "./AreaForm.types";
import { Controller, useFormState } from "react-hook-form";
import { AreaHeader } from "./components/AreaHeader/AreaHeader";
import { iconTrash, iconOpen, iconClose } from "@/assets/";
import { Input } from "@/components/Input";
import { MapPicker } from "@/components/MapPicker";

// prettier-ignore
export const AreaForm = ({areaNumber,control,index,infoText,onDelete}: AreaFormProps): JSX.Element => {
  const { errors } = useFormState({ control });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`flex-none flex flex-col gap-5 rounded-2xl border border-black/10 shadow-xl ${errors.areasForm?.areas?.[index] ? "border-red-500" : ""}`}>
      <AreaHeader
        title={infoText.titleArea}
        areaNumber={areaNumber}
        isOpen={isOpen}
        icons={{ iconTrash, iconOpen, iconClose }}
        onDelete={() => onDelete(index)}
        onToggle={() => setIsOpen((prev) => !prev)}
      />
      <div className={`${isOpen ? "block" : "hidden"} px-6 pb-6 flex-1 flex flex-col gap-5`}>
        <Controller
        name={`areasForm.areas.${index}.coordinates`}
        control={control}
        shouldUnregister={false}
        rules={{
          validate: infoText.coordinates.validate,
        }}
        render={({ field, fieldState: { error } }) => (
          <MapPicker
            label={infoText.coordinates.label}
            tooltipText={infoText.coordinates.tooltipText}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name={`areasForm.areas.${index}.radius`}
        control={control}
        shouldUnregister={false}
        rules={{
          validate: infoText.radius.validate,
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            classInput={`w-1/5`}
            label={infoText.radius.label}
            placeholder={infoText.radius.placeholder}
            tooltipText={infoText.radius.tooltipText}
            error={error?.message}
            value={field.value}
            onChange={value =>field.onChange(value === "" || value == null? null: isNaN(Number(value))? null: Number(value))}
          />
        )}
      />
      </div>
    </div>
  );
};
