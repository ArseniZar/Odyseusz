import { Controller } from "react-hook-form";
import { TextareaInput } from "@/components/TextareaInput";
import type { JSX } from "react";
import type { GeneralInfoFormProps } from "./GeneralInfoForm.types";


// prettier-ignore
export const GeneralInfoForm = ({control,infoText, isActive}: GeneralInfoFormProps): JSX.Element => {
  return (
    <div className={`px-6 py-4 mb-10 flex flex-col gap-4 rounded-2xl border border-black/10 shadow-2xl overflow-auto ${isActive ? "block" : "hidden"}`}>
      <Controller
        name={`generalInfoForm.description`}
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
    </div>
  );
};
