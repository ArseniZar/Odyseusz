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
                    <p className="font-medium text-lg">{infoText.informationSectionConfig.name.label}:<span className="font-light ml-1"> {assistant.name} </span></p>
                    <p className="font-medium text-lg">{infoText.informationSectionConfig.workingHours.label}:<span className="font-light ml-1"> {assistant.workingHours} </span></p>
                    <p className="font-medium text-lg">{infoText.informationSectionConfig.phone.label}:<span className="font-light ml-1"> {assistant.phone} </span></p>
                    <p className="font-medium text-lg">{infoText.informationSectionConfig.email.label}:<span className="font-light ml-1"> {assistant.email} </span></p>
                </div>
                <Controller
                    name={`assistantsForm.assistants.${index}.isActive`}
                    control={control}
                    shouldUnregister={false}
                    rules={{
                        validate: infoText.evacuationSectionConfig.isActive.validate,
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <Input
                        type="checkbox"
                        label={infoText.evacuationSectionConfig.isActive.label}
                        tooltipText={infoText.evacuationSectionConfig.isActive.tooltipText}
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