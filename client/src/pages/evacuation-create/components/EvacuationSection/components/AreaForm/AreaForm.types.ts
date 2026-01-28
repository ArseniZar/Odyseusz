import type { EvacuationSectionConfig } from "../../../../config/evacuationSection.types";
import type { EvacuationFormValues } from "../../../../EvacuationCreatePage.types";
import type { Control } from "react-hook-form";

export interface AreaFormProps {
    infoText:EvacuationSectionConfig["areaForm"];
    control: Control<EvacuationFormValues>;
    isActive: boolean;
}