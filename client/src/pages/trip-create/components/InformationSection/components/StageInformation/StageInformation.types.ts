import type { StageFormValues } from "@/pages/trip-create/TripCreatePage.types";
import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";

export interface StageInformationProps {
  stageNumber: number;
  infoText: InformationSectionConfig["stage"];
  dataRange: StageFormValues["dateRange"];
  numberOfPeople: StageFormValues["numberOfPeople"];
}
