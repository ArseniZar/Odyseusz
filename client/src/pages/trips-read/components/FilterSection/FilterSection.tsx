import { useState, type JSX } from "react";
import { Controller } from "react-hook-form";
import { format, isValid, parse } from "date-fns";

import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Button } from "@/components/Button";

import type { FilterSectionProps } from "./FilterSection.types";

// prettier-ignore
export const FilterSection = ({infoText,control, onCreate}: FilterSectionProps): JSX.Element => {
  return (
    <section className="w-full flex flex-col px-10 justify-between">
      <div className="flex flex-col gap-6">
        <div className="w-full flex flex-row items-start justify-between">
          <div className="w-auto flex flex-row">
             <Button label={infoText.tripsButtons.create.label} onClick={onCreate}  classButton="mt-9 bg-black/90" classText="text-white"/>
          </div>

          <div className="w-4/5 flex flex-row gap-10 justify-end">
            <Controller
              name="numberOfStages"
              control={control}
              shouldUnregister={false}
              rules={{
                validate: infoText.numberOfStages.validate
              }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  className="w-1/7"
                  label={infoText.numberOfStages.label}
                  placeholder={infoText.numberOfStages.placeholder}
                  tooltipText={infoText.numberOfStages.tooltipText}
                  error={error?.message}
                  value={field.value}
                  onChange={value =>field.onChange(value === "" || value == null? null: isNaN(Number(value))? null: Number(value))}
                />
              )}
            />
            <Controller
              name="status"
              control={control}
              shouldUnregister={false}
              rules={{
                validate: infoText.status.validate
              }}
              render={({ field, fieldState: { error }}) => (
                <Select
                  className="min-w-1/7 max-w-5/7"
                  label={infoText.status.label}
                  placeholder={infoText.status.placeholder}
                  tooltipText={infoText.status.tooltipText}
                  error={error?.message}
                  options={infoText.status.options}
                  onChange={(v) => {field.onChange(v.map(option => option.value));
                  }}
                />
              )}
            />
            <Controller
              name="startDate"
              control={control}
              shouldUnregister={false}
              rules={{
                validate: infoText.startDate.validate
              }}
              render={({ field, fieldState: { error }}) => { 
                const [inputValue, setInputValue] = useState(field.value instanceof Date && isValid(field.value) ? format(field.value, infoText.formatDate) : "");
                return(
                  <Input
                    className="w-1/7"
                    label={infoText.startDate.label}
                    placeholder={infoText.startDate.placeholder}
                    tooltipText={infoText.startDate.tooltipText}
                    error={error?.message}
                    value={inputValue}
                    onChange={(v) => {
                      const limited = v.replace(/[^0-9/]/g, "").slice(0, 10);
                      setInputValue(limited);
                      const parsed = parse(limited, infoText.formatDate, new Date());
                      field.onChange(limited === "" ? null : isValid(parsed) ? parsed : limited);
                    }}
                  />
                )
              }}
            />
            <Controller
              name="endDate"
              control={control}
              shouldUnregister={false}
              rules={{
                validate: infoText.endDate.validate
              }}
              render={({ field, fieldState: { error }}) => { 
                const [inputValue, setInputValue] = useState(field.value instanceof Date && isValid(field.value) ? format(field.value, infoText.formatDate) : "");
                return(
                  <Input
                    className="w-1/7"
                    label={infoText.endDate.label}
                    placeholder={infoText.endDate.placeholder}
                    tooltipText={infoText.endDate.tooltipText}
                    error={error?.message}
                    value={inputValue}
                    onChange={(v) => {
                      const limited = v.replace(/[^0-9/]/g, "").slice(0, 10);
                      setInputValue(limited);
                      const parsed = parse(limited, infoText.formatDate, new Date());
                      field.onChange(limited === "" ? null : isValid(parsed) ? parsed : limited);
                    }}
                  />
                )
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
