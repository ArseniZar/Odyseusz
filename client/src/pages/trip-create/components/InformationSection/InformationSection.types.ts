
import type { StagesValue } from "../../TripCreatePage.types";
import type { InformationSectionConfig } from "../../config/informationSection.config.types";

export interface StagesInformationProps {
  infoText: InformationSectionConfig;
  watch: StagesValue["stages"];
  onCancel: () => void;
  onSubmit: () => void;
}