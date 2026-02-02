import { useState, type JSX } from "react";
import { Controller } from "react-hook-form";

import { Select } from "@/components/Select";

import { format, isValid, parse } from "date-fns";
import type { FilterSectionProps } from "./FilterSection.types";
import { Input } from "@/components/Input";

// prettier-ignore
export const FilterSection = ({infoText,control}: FilterSectionProps): JSX.Element => {
  return (
    <section className="w-full flex flex-col px-10 justify-between">
      <div className="flex flex-col gap-6">
        <div className="w-full flex flex-row-reverse items-start justify-between">

          <div className="w-4/5 flex flex-row gap-10 justify-end">
            <Controller
              name="lastUpdateDate"
              control={control}
              shouldUnregister={false}
              rules={{
                validate: infoText.lastUpdateDate.validate
              }}
              render={({ field, fieldState: { error }}) => { 
                const [inputValue, setInputValue] = useState(field.value instanceof Date && isValid(field.value) ? format(field.value, infoText.formatDate) : "");
                return(
                  <Input
                    className="w-3/14"
                    label={infoText.lastUpdateDate.label}
                    placeholder={infoText.lastUpdateDate.placeholder}
                    tooltipText={infoText.lastUpdateDate.tooltipText}
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
                    name={`isEditable`}
                    control={control}
                    shouldUnregister={false}
                    rules={{
                        validate: infoText.isEditable.validate,
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <Input
                        type="checkbox"
                        label={infoText.isEditable.label}
                        tooltipText={infoText.isEditable.tooltipText}
                        error={error?.message}
                        className="flex-row-reverse items-center"
                        classInput="w-6 h-6"
                        value={field.value}
                        onChange={(value) => {
                            field.onChange(value);
                        }}
                        />
                    )}
                />
          </div>
        </div>
      </div>
    </section>
  );
};
