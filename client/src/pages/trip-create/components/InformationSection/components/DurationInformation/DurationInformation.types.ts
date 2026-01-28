import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";

export interface DurationInformationProps {
  infoText: InformationSectionConfig;
  dataRange: { startDate: Date | null; endDate: Date | null };
}