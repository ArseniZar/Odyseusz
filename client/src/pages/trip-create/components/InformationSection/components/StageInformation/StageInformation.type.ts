import type { InformationSectionConfig } from "../../../../config/informationSection.config.type";

export interface StageInformationProps {
  stageNumber: number;
  infoText: InformationSectionConfig;
  dataRange: { startDate: Date | null; endDate: Date | null };
  numberOfPeople: number | null;
}
