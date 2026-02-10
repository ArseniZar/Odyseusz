import type { EvacuationSectionConfig } from "../../../../config/evacuationSection.types";
import type { EvacuationFormValues } from "@/types/forms/evacuation";
import type { Control } from "react-hook-form";

export interface GeneralInfoFormProps {
    infoText: EvacuationSectionConfig["generalInfoForm"];
    control: Control<EvacuationFormValues>;
    isActive: boolean;
}