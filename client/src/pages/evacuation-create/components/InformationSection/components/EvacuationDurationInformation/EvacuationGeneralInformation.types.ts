import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";

export interface  EvacuationGeneralInformationProps {
  name: string | null;
  description: string | null;
  reason: string | null;
  area: number | null;
  infoText: InformationSectionConfig;
}