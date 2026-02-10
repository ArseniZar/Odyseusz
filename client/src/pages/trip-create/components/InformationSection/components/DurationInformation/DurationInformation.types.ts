import type { StageFormValues } from "@/types/forms/trip";
import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";

export interface DurationInformationProps {
  infoText: InformationSectionConfig;
  dataRange: StageFormValues["dateRange"];
}