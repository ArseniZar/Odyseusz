import type { InformationSectionConfig } from "../../../../config/informationSection.config.types";

export interface PointInformationProps {
  pointNumber: number;
  infoText: InformationSectionConfig["point"];
  name: string | null;
  description: string | null;
}
