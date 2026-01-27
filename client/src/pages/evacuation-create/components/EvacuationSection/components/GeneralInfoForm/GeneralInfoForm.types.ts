import type { EvacuationSectionConfig } from "@/pages/evacuation-create/config/evacuationSection.types";
import type { EvacuationFormValues } from "@/pages/evacuation-create/EvacuationCreatePage.types";
import type { Control } from "react-hook-form";

export interface GeneralInfoFormProps {
    infoText: EvacuationSectionConfig["generalInfoForm"];
    control: Control<EvacuationFormValues>;
    isActive: boolean;
}