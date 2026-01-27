
import type { StagesValue } from "../../TripCreatePage.types";
import type { InformationSectionConfig } from "../../config/informationSection.config.types";

export interface StagesInformationProps {
  infoText: InformationSectionConfig;
  stages: StagesValue["stages"];
  onCancel: () => void;
  onSubmit: () => void;
}