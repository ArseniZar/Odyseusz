import type { AreaFormValues } from "../../../../EvacuationCreatePage.types";
import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";

export interface AreaInformationProps {
  areaNumber: number;
  infoText: InformationSectionConfig["area"];
  radius: AreaFormValues["radius"];
}
