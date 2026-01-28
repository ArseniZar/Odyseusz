import type { JSX } from "react";
import type { ConsulatesFormProps } from "./ConsulatesForm.types";
import { ConsulateForm } from "./components/ConsulateForm/ConsulateForm";

export const ConsulatesForm = ({control,fields,infoText,isActive}:ConsulatesFormProps): JSX.Element => {
    return (
        <div className={`px-6 py-4 mb-10 flex flex-col gap-4 rounded-2xl border border-black/10 shadow-2xl overflow-auto ${isActive ? "block" : "hidden"}`}>
            {fields.map((field, index) => (
                    <ConsulateForm
                      key={field.id}
                      index={index}
                      control={control}
                      infoText={{profileCountrySectionConfig:infoText.profileCountrySectionConfig.consulate, informationSectionConfig:infoText.informationSectionConfig}}
                    />
                  ))}
        </div>
    );
}