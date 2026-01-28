import type { EvacuationSectionConfig } from "../../../../../../config/evacuationSection.types";
import type { InformationSectionConfig } from "../../../../../../config/informationSection.config.types";
import type { EvacuationFormValues } from "../../../../../../EvacuationCreatePage.types";
import type { Control } from "react-hook-form";

export interface AssistantFormProps {
  assistantNumber?: number;
  infoText: {
    evacuationSectionConfig:EvacuationSectionConfig["assistantsForm"]["assistant"];
    informationSectionConfig:InformationSectionConfig["assistant"];
  };
  index: number;
  control: Control<EvacuationFormValues>;
}
