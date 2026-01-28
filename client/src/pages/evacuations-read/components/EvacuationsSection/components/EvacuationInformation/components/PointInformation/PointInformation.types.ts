import type { EvacuationsSectionConfig } from "../../../../../../config/evacuationsSection.config.types";

export interface PointInformationProps {
  pointNumber: number;
  infoText: EvacuationsSectionConfig["point"];
  name: string;
  description: string;
  coordinates: {
        latitude: number;
        longitude: number;
  };
}
