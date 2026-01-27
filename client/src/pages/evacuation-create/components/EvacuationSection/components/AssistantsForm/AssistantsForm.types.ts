import type { EvacuationSectionConfig } from "@/pages/evacuation-create/config/evacuationSection.types";
import type { InformationSectionConfig } from "@/pages/evacuation-create/config/informationSection.config.types";
import type { EvacuationFormValues } from "@/pages/evacuation-create/EvacuationCreatePage.types";
import type { Control, FieldArrayWithId } from "react-hook-form";

export interface AssistantsFormProps {
    control: Control<EvacuationFormValues>;
    infoText: EvacuationSectionConfig["assistantsForm"] & InformationSectionConfig["assistants"];
    isActive: boolean;
    fields:FieldArrayWithId<EvacuationFormValues, "assistantsForm.assistants">[]
}