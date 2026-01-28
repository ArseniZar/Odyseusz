import type { JSX } from "react";
import type { AssistantsFormProps } from "./AssistantsForm.types";
import { AssistantForm } from "./components/AssistantForm/AssistantForm";

export const AssistantsForm = ({control,fields,infoText,isActive}:AssistantsFormProps): JSX.Element => {
    return (
        <div className={`px-6 py-4 mb-10 flex flex-col gap-4 rounded-2xl border border-black/10 shadow-2xl overflow-auto ${isActive ? "block" : "hidden"}`}>
            {fields.map((field, index) => (
                    <AssistantForm
                      key={field.id}
                      index={index}
                      control={control}
                      infoText={{evacuationSectionConfig:infoText.evacuationSectionConfig.assistant, informationSectionConfig:infoText.informationSectionConfig}}
                    />
                  ))}
        </div>
    );
}