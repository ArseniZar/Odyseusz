import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";

export interface TripDurationInformationProps {
  infoText: InformationSectionConfig;
  dataRange: { startDate: Date | null; endDate: Date | null };
}