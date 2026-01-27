import { Controller } from "react-hook-form";

import { Input } from "@/components/Input";
import { TextareaInput } from "@/components/TextareaInput";

import type { JSX } from "react";
import type { GeneralInfoFormProps } from "./GeneralInfoForm.types";


// prettier-ignore
export const GeneralInfoForm = ({control,infoText, isActive}: GeneralInfoFormProps): JSX.Element => {
  return (
    <div className={`px-6 py-4 mb-10 flex flex-col gap-4 rounded-2xl border border-black/10 shadow-2xl overflow-auto ${isActive ? "block" : "hidden"}`}>
      <Controller
        name={`generalInfoForm.name`}
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
        name={`generalInfoForm.reason`}
        control={control}
        shouldUnregister={false}
        rules={{
          validate: infoText.reason.validate,
        }}
        render={({ field, fieldState: { error } }) => (
          <TextareaInput
            label={infoText.reason.label}
            placeholder={infoText.reason.placeholder}
            tooltipText={infoText.reason.tooltipText}
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
      <Controller
        name={`generalInfoForm.activateImmediately`}
        control={control}
        shouldUnregister={false}
        rules={{
          validate: infoText.activateImmediately.validate,
        }}
        render={({ field, fieldState: { error } }) => (
          <Input
            type="checkbox"
            label={infoText.activateImmediately.label}
            tooltipText={infoText.activateImmediately.tooltipText}
            error={error?.message}
            className="flex-row items-center"
            classInput="w-6 h-6"
            value={field.value}
            onChange={(value) => {
              field.onChange(value);
            }}
          />
        )}
      />
    </div>
  );
};
