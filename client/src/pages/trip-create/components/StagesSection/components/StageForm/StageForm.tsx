import { useState, type JSX } from "react";
import { Controller } from "react-hook-form";

import { StageHeader } from "../StageHeader/StageHeader";

import { iconTrash, iconOpen, iconClose } from "@/assets/";
import { MapPicker } from "@/components/MapPicker/MapPicker";
import { DayPicker } from "@/components/DayPicker/";
import { Input } from "@/components/Input/Input";

import type { StageFormProps } from "./StageForm.types";

// prettier-ignore
export const StageForm = ({stageNumber,infoText,index, control, errors, onDelete, prevData , nextData}: StageFormProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

return (
  <div className={`flex-none flex flex-col gap-5 rounded-2xl border border-black/10 shadow-xl ${errors ? "border-red-500" : ""}`}>
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
        render={({ field }) =>
          <Input
            classInput={`w-1/4 ${errors?.numberOfPeople ? "border-red-500" : ""}`}
            label={infoText.numberOfPeople.label}
            placeholder={infoText.numberOfPeople.placeholder}
            tooltipText={infoText.numberOfPeople.tooltipText}
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
        render={({ field }) => (
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
        render={({ field }) => {
        const { startDate, endDate } = field.value;
        return (
            <DayPicker
              label ={infoText.dateRange.label}
              tooltipText ={infoText.dateRange.tooltipText}
              classInput={`mx-auto ${errors?.dateRange ? "border-red-500" : ""}`}
              animate
              captionLayout="dropdown"
              navLayout="around"
              mode="range"
              min={1}
              numberOfMonths={2}
              disabled={{ before: prevData?.dateRange.endDate ?? new Date() , 
                          after: nextData?.dateRange.startDate ?? undefined
              }}
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
