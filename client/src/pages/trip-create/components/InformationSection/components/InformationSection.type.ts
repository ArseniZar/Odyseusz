
import type { StagesValue } from "../../TripCreatePage.type";
import type { InformationSectionConfig } from "../../../config/informationSection.config.type";

export interface StagesInformationProps {
  infoText: InformationSectionConfig;
  watch: StagesValue["stages"];
  onCancel: () => void;
  onSubmit: () => void;
}