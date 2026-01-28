import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";

export interface  GeneralInformationProps {
  name: string | null;
  description: string | null;
  reason: string | null;
  radius: number | null;
  infoText: InformationSectionConfig;
}