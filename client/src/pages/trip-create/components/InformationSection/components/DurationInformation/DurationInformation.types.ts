import type { StageFormValues } from "@/pages/trip-create/TripCreatePage.types";
import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";

export interface DurationInformationProps {
  infoText: InformationSectionConfig;
  dataRange: StageFormValues["dateRange"];
}