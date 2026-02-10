import type { EvacuationFormValues } from "@/types/forms/evacuation";
import type { InformationSectionConfig } from "../../config/informationSection.config.types";


export interface InformationSectionProps {
  infoText: InformationSectionConfig;
  evacuation: EvacuationFormValues;
  onCancel: () => void;
  onSubmit: () => void;

}