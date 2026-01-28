import type { JSX } from "react";
import { Controller } from "react-hook-form";

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
             <Button label={infoText.evacuationsButtons.create.label} onClick={onCreate}  classButton="mt-9 bg-black/90" classText="text-white"/>
          </div>

          <div className="w-4/5 flex flex-row gap-10 justify-end">
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
          </div>
        </div>
      </div>
    </section>
  );
};
