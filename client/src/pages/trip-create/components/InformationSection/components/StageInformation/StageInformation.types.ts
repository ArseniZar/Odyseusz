import type { StageFormValues } from "@/types/forms/trip";
import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";

export interface StageInformationProps {
  stageNumber: number;
  infoText: InformationSectionConfig["stage"];
  dataRange: StageFormValues["dateRange"];
  numberOfPeople: StageFormValues["numberOfPeople"];
}
