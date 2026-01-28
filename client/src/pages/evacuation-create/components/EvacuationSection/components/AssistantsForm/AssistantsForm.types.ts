import type { EvacuationSectionConfig } from "../../../../config/evacuationSection.types";
import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";
import type { EvacuationFormValues } from "../../../../EvacuationCreatePage.types";
import type { Control, FieldArrayWithId } from "react-hook-form";

export interface AssistantsFormProps {
    control: Control<EvacuationFormValues>;
    infoText: {
      evacuationSectionConfig:EvacuationSectionConfig["assistantsForm"];
      informationSectionConfig:InformationSectionConfig["assistant"];
    };
    isActive: boolean;
    fields:FieldArrayWithId<EvacuationFormValues, "assistantsForm.assistants">[]
}