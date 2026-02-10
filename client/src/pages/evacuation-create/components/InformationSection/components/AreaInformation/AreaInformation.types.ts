import type { AreaFormValues } from "@/types/forms/evacuation";
import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";

export interface AreaInformationProps {
  areaNumber: number;
  infoText: InformationSectionConfig["area"];
  radius: AreaFormValues["radius"];
}
