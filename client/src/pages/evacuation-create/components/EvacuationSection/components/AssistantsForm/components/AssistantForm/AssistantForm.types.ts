import type { EvacuationSectionConfig } from "@/pages/evacuation-create/config/evacuationSection.types";
import type { InformationSectionConfig } from "@/pages/evacuation-create/config/informationSection.config.types";
import type { EvacuationFormValues } from "@/pages/evacuation-create/EvacuationCreatePage.types";
import type { Control } from "react-hook-form";

export interface AssistantFormProps {
  assistantNumber?: number;
  infoText: EvacuationSectionConfig["assistantsForm"]["assistant"] & InformationSectionConfig["assistants"];
  index: number;
  control: Control<EvacuationFormValues>;
}
