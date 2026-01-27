import { useState, type JSX } from "react";
import type { PointFormProps } from "./PointForm.types";
import { Controller, useFormState } from "react-hook-form";
import { PointHeader } from "./components/PointHeader/PointHeader";
import { iconTrash, iconOpen, iconClose } from "@/assets/";
import { Input } from "@/components/Input";
import { MapPicker } from "@/components/MapPicker";
import { TextareaInput } from "@/components/TextareaInput";

// prettier-ignore
export const PointForm = ({pointNumber,control,index,infoText,onDelete}: PointFormProps): JSX.Element => {
  const { errors } = useFormState({ control });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`flex-none flex flex-col gap-5 rounded-2xl border border-black/10 shadow-xl ${errors.colectionPointsForm?.points?.[index] ? "border-red-500" : ""}`}>
      <PointHeader
        title={infoText.titlePoint}
        pointNumber={pointNumber}
        isOpen={isOpen}
        icons={{ iconTrash, iconOpen, iconClose }}
        onDelete={() => onDelete(index)}
        onToggle={() => setIsOpen((prev) => !prev)}
      />
      <div className={`${isOpen ? "block" : "hidden"} px-6 pb-6 flex-1 flex flex-col gap-5`}>
        <Controller
          name={`colectionPointsForm.points.${index}.name`}
          control={control}
          shouldUnregister={false}
          rules={{
            validate: infoText.name.validate,
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              label={infoText.name.label}
              placeholder={infoText.name.placeholder}
              tooltipText={infoText.name.tooltipText}
              error={error?.message}
              value={field.value}
              onChange={(value) => {
                field.onChange(value === "" ? null : value);
              }}
            />
          )}
        />
        <Controller
          name={`colectionPointsForm.points.${index}.description`}
          control={control}
          shouldUnregister={false}
          rules={{
            validate: infoText.description.validate,
          }}
          render={({ field, fieldState: { error } }) => (
            <TextareaInput
              label={infoText.description.label}
              placeholder={infoText.description.placeholder}
              tooltipText={infoText.description.tooltipText}
              error={error?.message}
              classTextarea="h-20"
              value={field.value}
              onChange={(value) => {
                field.onChange(value === "" ? null : value);
              }}
            />
          )}
        />
        <Controller
          name={`colectionPointsForm.points.${index}.coordinates`}
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
      </div>
    </div>
  );
};
