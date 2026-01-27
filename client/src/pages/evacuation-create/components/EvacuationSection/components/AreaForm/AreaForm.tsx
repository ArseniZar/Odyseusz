import { Controller } from "react-hook-form";

import { MapPicker } from "@/components/MapPicker";

import type { JSX } from "react";
import type { AreaFormProps } from "./AreaForm.types";
import { Input } from "@/components/Input";

export const AreaForm = ({ control, infoText, isActive }: AreaFormProps): JSX.Element => {
  return (
    <div className={`px-6 py-4 mb-10 flex flex-col gap-4 rounded-2xl border border-black/10 shadow-2xl  ${isActive ? "block" : "hidden"}`}>
      <Controller
        name={`areaForm.coordinates`}
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
        name={`areaForm.radius`}
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
  );
};
