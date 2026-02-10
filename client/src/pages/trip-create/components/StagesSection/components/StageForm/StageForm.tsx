import { useState, type JSX } from "react";
import { Controller, useFormState } from "react-hook-form";

import { StageHeader } from "./components/StageHeader/StageHeader";

import { iconTrash, iconOpen, iconClose } from "@/assets/";
import { MapPicker } from "@/components/MapPicker/MapPicker";
import { DayPicker } from "@/components/DayPicker/";
import { Input } from "@/components/Input/Input";

import type { StageFormProps } from "./StageForm.types";

// prettier-ignore
export const StageForm = ({stageNumber,infoText,index, control, onDelete, prevDateRange , nextDateRange}: StageFormProps): JSX.Element => {
  const { errors } = useFormState({ control });
  const [isOpen, setIsOpen] = useState(false);
return (
  <div className={`flex-none flex flex-col gap-5 rounded-2xl border border-black/10 shadow-xl ${errors.stages?.[index] ? "border-red-500" : ""}`}>
    <StageHeader 
        title={infoText.titleStage} 
        stageNumber={stageNumber} 
        isOpen={isOpen}
        icons={{iconTrash, iconOpen, iconClose}}
        onDelete={() => onDelete(index)}
        onToggle={() => setIsOpen(prev => !prev)}
    />

    <div className={`${isOpen ? "block" : "hidden"} px-6 pb-6 flex-1 flex flex-col gap-5`}>
      <Controller
        name={`stages.${index}.numberOfPeople`}
        control={control}
        shouldUnregister={false}
        rules={{
          validate: infoText.numberOfPeople.validate
        }}
        render={({ field, fieldState: { error }}) =>
          <Input
            classInput={`w-1/5`}
            label={infoText.numberOfPeople.label}
            placeholder={infoText.numberOfPeople.placeholder}
            tooltipText={infoText.numberOfPeople.tooltipText}
            error={error?.message}
            value={field.value}
            onChange={value =>field.onChange(value === "" || value == null? null: isNaN(Number(value))? null: Number(value))}
          />
        }
      />
      <Controller
        name={`stages.${index}.coordinates`}
        control={control}
        shouldUnregister={false}
        rules={{
          validate: infoText.coordinates.validate
        }}
        render={({ field, fieldState: {  } }) => (
          <MapPicker
            label={infoText.coordinates.label}
            tooltipText={infoText.coordinates.tooltipText}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name={`stages.${index}.dateRange`}
        control={control}
        shouldUnregister={false}
        rules={{
          validate: infoText.dateRange.validate
        }}
        render={({ field, fieldState: { error } }) => {
        const { startDate, endDate } = field.value;
        return (
            <DayPicker
              label ={infoText.dateRange.label}
              tooltipText ={infoText.dateRange.tooltipText}
              error={error?.message}
              classInput={`mx-auto`}
              animate
              captionLayout="dropdown"
              navLayout="around"
              mode="range"
              min={0}
              numberOfMonths={2}
              
              disabled={(() => {
                const before = prevDateRange?.endDate ?? new Date(new Date().setHours(0, 0, 0));
                const after = nextDateRange?.startDate ?? undefined;
                const matchers = [];

                if (before && after) {
                  matchers.push({ before, after }, before, after);
                } else if (before) {
                  matchers.push({ before }, before);
                } else if (after) {
                  matchers.push({ after }, after);
                }

                return matchers;
              })()}

                selected={{
                from: startDate ?? undefined,
                to: endDate ?? undefined,
              }}
              onSelect={(range) => {
                field.onChange({
                  startDate: range?.from ?? null,
                  endDate: range?.to ?? null,
                });
              }}
            />
        );
        }}
      />          
    </div>
  </div>);
};
