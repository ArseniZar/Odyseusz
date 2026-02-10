import type { JSX } from "react";
import { Controller, useWatch } from "react-hook-form";
import { Input } from "@/components/Input";
import type { ConsulateFormProps } from "./ConsulateForm.types";
import { formatDate } from "@/utils/formatDate";

export const ConsulateForm = ({infoText, control,index}:ConsulateFormProps): JSX.Element => {
    const consulate = useWatch({
        control,
        name: `consulatesForm.consulates.${index}`,
    });
    return (
        <div className="flex-none flex flex-col gap-5 rounded-2xl border border-black/10 shadow-xl">
        <div className={`px-6 py-6 flex-1 flex flex-col gap-5 `}>
            <div className="flex flex-row  justify-between gap-5 ">
                <div className="flex flex-col font-light">
                    <p className="font-medium text-lg">{infoText.informationSectionConfig.address.label}:<span className="font-light ml-1"> {consulate.address} </span></p>
                    <p className="font-medium text-lg">{infoText.informationSectionConfig.email.label}:<span className="font-light ml-1"> {consulate.email} </span></p>
                    <p className="font-medium text-lg">{infoText.informationSectionConfig.phone.label}:<span className="font-light ml-1"> {consulate.phone} </span></p>
                    <p className="font-medium text-lg">{infoText.informationSectionConfig.website.label}:<span className="font-light ml-1"> {consulate.website} </span></p>
                    <p className="font-medium text-lg">{infoText.informationSectionConfig.dataUpdate.label}:<span className="font-light ml-1"> {formatDate(consulate.dataUpdate)} </span></p>
                </div>
                <Controller
                    name={`consulatesForm.consulates.${index}.isActive`}
                    control={control}
                    shouldUnregister={false}
                    rules={{
                        validate: infoText.profileCountrySectionConfig.isActive.validate,
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <Input
                        type="checkbox"
                        label={infoText.profileCountrySectionConfig.isActive.label}
                        tooltipText={infoText.profileCountrySectionConfig.isActive.tooltipText}
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