import type { InformationSectionConfig } from "../../config/informationSection.config.types";
import type { EvacuationFormValues } from "../../EvacuationCreatePage.types";

export interface InformationSectionProps {
  infoText: InformationSectionConfig;
  evacuation: EvacuationFormValues;
  onCancel: () => void;
  onSubmit: () => void;

}