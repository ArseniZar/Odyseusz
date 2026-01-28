
import type { TripFormValue } from "../../TripCreatePage.types";
import type { InformationSectionConfig } from "../../config/informationSection.config.types";

export interface InformationSectionProps {
  infoText: InformationSectionConfig;
  stages: TripFormValue["stages"];
  onCancel: () => void;
  onSubmit: () => void;
}