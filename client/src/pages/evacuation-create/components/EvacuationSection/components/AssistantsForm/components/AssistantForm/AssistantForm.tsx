import type { JSX } from "react";
import type { AssistantFormProps } from "./AssistantForm.types";
import { Controller, useWatch } from "react-hook-form";
import { Input } from "@/components/Input";

export const AssistantForm = ({infoText, assistantNumber, control,index}:AssistantFormProps): JSX.Element => {
    const assistant = useWatch({
        control,
        name: `assistantsForm.assistants.${index}`,
    });
    return (
        <div className="flex-none flex flex-col gap-5 rounded-2xl border border-black/10 shadow-xl">
        <div className={`px-6 py-6 flex-1 flex flex-col gap-5 `}>
            <div className="flex flex-row  justify-between gap-5 ">
                <div className="flex flex-col font-light">
                    <p className="font-medium text-lg">{infoText.name.label}:{" "}<span className="font-light"> {assistant.name} </span></p>
                    <p className="font-medium text-lg">{infoText.workingHours.label}:{" "}<span className="font-light"> {assistant.workingHours} </span></p>
                    <p className="font-medium text-lg">{infoText.phone.label}:{" "}<span className="font-light"> {assistant.phone} </span></p>
                    <p className="font-medium text-lg">{infoText.email.label}:{" "}<span className="font-light"> {assistant.email} </span></p>
                </div>
                <Controller
                    name={`assistantsForm.assistants.${index}.isActive`}
                    control={control}
                    shouldUnregister={false}
                    rules={{
                        validate: infoText.isActive.validate,
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <Input
                        type="checkbox"
                        label={infoText.isActive.label}
                        tooltipText={infoText.isActive.tooltipText}
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
        </div>
        </div>
    );
}